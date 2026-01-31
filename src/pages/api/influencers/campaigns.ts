import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

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
      return res.status(401).json({ message: "No token" });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== "INFLUENCER") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const campaigns = await prisma.campaign.findMany({
      where: { status: "PUBLISHED" },
      select: {
        id: true,
        title: true,
        brand: true,
        platforms: true,
        deadline: true,
        deliverables: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(campaigns);
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
}
