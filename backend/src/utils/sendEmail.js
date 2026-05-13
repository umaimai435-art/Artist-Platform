const nodemailer = require("nodemailer");

const sendEmail = async ({ to, email, subject, html, text }) => {
  try {
    // ✅ accept BOTH "to" and "email"
    const recipient = to || email;

    if (!recipient) {
      throw new Error("No recipient email provided");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `ArtistryPro <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject,
      html,
      text,
    });

  } catch (error) {
    console.log("Email error:", error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;