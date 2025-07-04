const registerUser = async(req, res)=> {
    const { name, email, password } = req.body;
    try {
        //get the user data from req.body
        //validate the data
        //check if the user already exists
        //if yes throw an error or if not create the user in database
        //create a verification token
        //save the token in the data base
        //send the token as email to user
        //response status 200 to the user
        return res
                .status(200)
                .json({
                    message:"User Registered Successfully",
                    email
                })
        
    } catch (error) {
        
    }
}

export { registerUser };