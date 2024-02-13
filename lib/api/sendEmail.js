const nodemailer = require("nodemailer");

/**
 * Send email using Nodemailer.
 * @param {string} to - Email address of the recipient.
 * @param {string} subject - Subject of the email.
 * @param {string} html - HTML content of the email.
 * @throws {Error} - Throws error if sending email fails.
 */
const sendEmail = async (to, subject, html) => {
  try {
    // Create transporter with Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.SMPT_EMAIL, // Replace with your Gmail email address
        pass: process.env.SMPT_PASSWORD, // Replace with your Gmail password
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
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

// Export sendEmail function
module.exports = { sendEmail };
