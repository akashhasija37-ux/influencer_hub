import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    /* ================= AUTH ================= */

    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    const userId = payload.userId as string;
    const role = payload.role as string;

    if (!userId || role !== "INFLUENCER") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    /* ================= DASHBOARD DATA ================= */

    const influencer = await prisma.influencer.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!influencer) {
      return res.status(200).json({
        stats: {
          totalCampaigns: 0,
          appliedCampaigns: 0,
          totalApplications: 0,
          engagementRate: 0,
        },
      });
    }

    const totalCampaigns = await prisma.campaign.count({
      where: { status: "PUBLISHED" },
    });

    const totalApplications = await prisma.application.count({
      where: { influencerId: influencer.id },
    });

    return res.status(200).json({
      stats: {
        totalCampaigns,
        appliedCampaigns: totalApplications,
        totalApplications,
        engagementRate: 8.4, // can be computed later
      },
    });
  } catch (error) {
    console.error("INFLUENCER DASHBOARD ERROR:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
