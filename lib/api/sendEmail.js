const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    // Replace 'your_email@gmail.com' and 'your_password' with your Gmail credentials
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.SMPT_EMAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.SMPT_EMAIL,
      to,
      subject,
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

module.exports = { sendEmail };
