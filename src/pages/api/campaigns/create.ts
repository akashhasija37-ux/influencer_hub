import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // 1️⃣ Read auth cookie
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 2️⃣ Verify token
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: "ADMIN" | "BRAND" | "INFLUENCER";
    };

    // 3️⃣ Only BRAND can create campaign
    if (payload.role !== "BRAND") {
      return res.status(403).json({ message: "Forbidden" });
    }

    // 4️⃣ Find Brand linked to this user
    const brand = await prisma.brand.findFirst({
      where: { userId: payload.userId },
    });

    if (!brand) {
      return res.status(400).json({ message: "Brand not found" });
    }

    const {
      title,
      description,
      niche,
      budget,
      deliverables,
      deadline,
      platforms,
      status,
    } = req.body;

    // 5️⃣ Save campaign
    const campaign = await prisma.campaign.create({
      data: {
        title,
        description,
        niche,
        budgetRange: budget,
        deliverables,
        deadline: new Date(deadline),
        platforms: platforms.join(","), // IMPORTANT
        status,
        brandId: brand.id,
      },
    });

    return res.status(201).json({ campaign });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
}
