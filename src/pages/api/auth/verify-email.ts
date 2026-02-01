import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token } = req.query;

  console.log(token,'000000000000000')

  if (!token || typeof token !== "string") {
    return res.status(400).json({ message: "Invalid token" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { verifyToken: token },
    });

    console.log(user,'111111111111111111111111')

    if (!user) {
      return res.status(400).json({ message: "Token invalid or expired" });
    }

    // ✅ Mark email verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
      emailVerified: true,
    verifyToken: null,
    
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
