import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Missing email or OTP" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        emailOtp: otp,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.emailOtpExpiry || user.emailOtpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailOtp: null,
        emailOtpExpiry: null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
