import bcrypt from "bcryptjs";
import User from "../model/Use.model.js";
import Crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {

    //get data
    const { name, email, password } = req.body

    //validate the data
    if (!name || !email || !password) {
        return res.status(400).json({
            message: `All fields are required`
        })
    }
    console.log(req.body)
    //Check if the user already exits
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exits",
            })
        }
        //If doesn't exits already create a new user
        const newlyCreatedUser = await User.create({
            name,
            email,
            password,
        })
        console.log(newlyCreatedUser);
        if (!newlyCreatedUser) {
            return res.status(400).json({
                message: "User not registered"
            })
        }
        //Create a verification token
        const token = Crypto.randomBytes(32).toString("hex");
        console.log(token);
        newlyCreatedUser.verificationToken = token;
        await newlyCreatedUser.save();


        //send token as email to the user

        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        const mailtrapOptions = {
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: newlyCreatedUser.email,
            subject: "Verify your Email",
            text: `Please click on the following link: ${process.env.BASE_URL}/api/v1/user/verify/${token}`,
        };

        await transporter.sendMail(mailtrapOptions);

        res.status(201).json({
            message: "User registered Successfully",
            success: true,
        })
    } catch (error) {
        res.status(400).json({
            message: "User not registered ",
            error,
            success: false,
        })
    }

}

const verifyUser = async (req, res) => {
    //get data from the url

    const { token } = req.params;

    console.log(token);

    if (!token) {
        res.status(400).json({
            message: "Invalid token"
        })
    }

    const user = await User.findOne({ verificationToken: token });
    console.log(user);
    if (!user) {
        res.status(400).json({
            message: "Invalid user"
        })
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            "shhhhhh",
            {
                expiresIn: "24h"
            }
        )
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        }
        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            success: true,
            message: "Login Successfull",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Login Failed",
        })
    }
}

export { registerUser, verifyUser, login };