import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };

    if (decoded.role !== "BRAND") {
      return res.status(403).json({ message: "Forbidden" });
    }

    // ✅ Find brand by userId
    const brand = await prisma.brand.findUnique({
      where: { userId: decoded.userId },
      select: { id: true },
    });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const brandId = brand.id;

    // ================= STATS =================
    const totalCampaigns = await prisma.campaign.count({
      where: { brandId },
    });

    const activeCampaigns = await prisma.campaign.count({
      where: { brandId, status: "PUBLISHED" },
    });

    const applications = await prisma.application.count({
      where: { campaign: { brandId } },
    });

    return res.status(200).json({
      stats: {
        totalCampaigns,
        activeCampaigns,
        applications,
        engagementRate: 8.4, // placeholder (can compute later)
        impressions: "1.2M",
        reach: "3.1M",
      },
      campaigns: [],
      applicationsList: [],
    });
  } catch (error) {
    console.error("BRAND STATS ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
