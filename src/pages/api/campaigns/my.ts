import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: "ADMIN" | "BRAND" | "INFLUENCER";
    };

    if (payload.role !== "BRAND") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const brand = await prisma.brand.findFirst({
      where: { userId: payload.userId },
    });

    if (!brand) {
      return res.status(400).json({ message: "Brand not found" });
    }

    const campaigns = await prisma.campaign.findMany({
      where: { brandId: brand.id },
      orderBy: { createdAt: "desc" },
      include: {
        applications: true,
      },
    });

    return res.status(200).json({ campaigns });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
}
