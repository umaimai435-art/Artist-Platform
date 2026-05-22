const nodemailer = require("nodemailer");

const sendEmail = async ({ to, email, subject, html, text }) => {
  try {
    // ✅ normalize recipient
    const recipient = to || email;

    if (!recipient || typeof recipient !== "string") {
      throw new Error("No valid recipient email provided");
    }

    if (!subject) {
      throw new Error("Email subject is missing");
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
      html: html || "",
      text: text || "",
    });

  } catch (error) {
    console.log("Email error:", error.message);
    throw new Error(error.message || "Email could not be sent");
  }
};

module.exports = sendEmail;