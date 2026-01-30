import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { transporter } from "@/lib/mailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    // 🔍 Check existing user
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 🔐 Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 🔢 Generate 6-digit OTP
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 👤 Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
        emailVerified: false,
        emailOtp,
        emailOtpExpiry,
      },
    });

    // 🎭 Role-based tables
    if (role === "INFLUENCER") {
      const base = email.split("@")[0];
      let username = base;
      let i = 0;

      while (
        await prisma.influencer.findUnique({ where: { username } })
      ) {
        i++;
        username = `${base}${i}`;
      }

      await prisma.influencer.create({
        data: {
          username,
          platform: "instagram",
          followers: 0,
          mediaCount: 0,
          connected: false,
          userId: user.id,
        },
      });
    }

    if (role === "BRAND") {
      await prisma.brand.create({
        data: {
          name: email.split("@")[0],
          industry: "Unknown",
          totalSpend: 0,
          userId: user.id,
        },
      });
    }

    // 📩 Send OTP Email
    await transporter.sendMail({
      from: `"Influencer Hub" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify your email (OTP)",
      html: `
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing:2px;">${emailOtp}</h1>
        <p>This code expires in 10 minutes.</p>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "OTP sent to your email",
      redirectTo: `/verify-email?email=${email}`,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
