import nodemailer from "nodemailer";

export default async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // O el servicio que utilices
      auth: {
        user: process.env.EMAIL_USER, // Tu email
        pass: process.env.EMAIL_PASSWORD, // Tu contraseña
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
}
