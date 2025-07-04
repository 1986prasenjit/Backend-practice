import Mailgen from "mailgen";
import nodemailer from "nodemailer";

export const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://mailgen.js/",
    },
  });

  var emailText = mailGenerator.generatePlaintext(options.mailGenCOntent);
  var emailHtml = mailGenerator.generate(options.mailGenCOntent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const mailTrapOptions = {
    from: 'mailGenerator.taskmanager@example.com',
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml,
  }

  try {
    await transporter.sendMail(mailTrapOptions)
  } catch (error) {
    console.log("Email sending Failed", error);
  }

};

export const emailVerificationMailgenContent = (userName, verificationUrl) => {
    return {
        body:{
            name: userName,
        intro: 'Welcome to our App! We are very excited to have you on board.',
        action: {
            instructions: 'To get started with our App, please click here:',
            button: {
                color: '#22BC66',
                text: 'verify your email to get started',
                link: verificationUrl,
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we will love to help.'
        }
    }
};
