import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        admin: true,
        brand: true,
        influencer: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ FIX IS HERE
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

  if (!user.emailVerified) {
  return res.status(403).json({
    message: "Please verify your email first",
  });
}



    const token = jwt.sign(
  {
    userId: user.id,
    role: user.role, // "ADMIN"
  },
  process.env.JWT_SECRET!,
  { algorithm: "HS256", expiresIn: "7d" }
);

res.setHeader(
  "Set-Cookie",
  serialize("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds to match the JWT
  })
);

  console.log(user.role,'////////////')
    let redirectTo = "/";
    if (user.role === "ADMIN") redirectTo = "/admin/dashboard";
    if (user.role === "BRAND") redirectTo = "/brand/dashboard";
    if (user.role === "INFLUENCER") redirectTo = "/influencer/dashboard";

    return res.status(200).json({ success: true, redirectTo });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
