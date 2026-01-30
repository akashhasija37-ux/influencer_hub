import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user?.emailOtp || !user?.emailOtpExpiry) {
    return res.status(400).json({ message: "Invalid request" });
  }

  if (user?.emailOtp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (new Date() > user?.emailOtpExpiry) {
    return res.status(400).json({ message: "OTP expired" });
  }

  await prisma.user.update({
    where: { email },
    data: {
      emailVerified: true,
      emailOtp: null,
      emailOtpExpiry: null,
    },
  });

  return res.json({ success: true });
}
