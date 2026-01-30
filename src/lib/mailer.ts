import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const verifyUrl = `http://localhost:3000/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Influencer Hub" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Verify your email</h2>
      <p>Click the link below to verify your account:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
  });
}
