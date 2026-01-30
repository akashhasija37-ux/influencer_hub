import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (payload.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const [
      totalBrands,
      totalInfluencers,
      activeCampaigns,
      totalApplications,
      paidSubscriptions,
      recentCampaigns,
      recentApplications,
    ] = await Promise.all([
      prisma.brand.count(),
      prisma.influencer.count(),
      prisma.campaign.count({ where: { status: "PUBLISHED" } }),
      prisma.application.count(),
      prisma.subscription.count({ where: { status: "ACTIVE" } }),
      prisma.campaign.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
        include: { brand: true },
      }),
      prisma.application.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
        include: {
          influencer: true,
          campaign: true,
        },
      }),
    ]);

    return res.status(200).json({
      stats: {
        totalBrands,
        totalInfluencers,
        activeCampaigns,
        totalApplications,
        paidSubscriptions,
        revenue: 84250, // replace later with real payments table
        profileViews: 28934,
        engagementRate: 4.8,
      },
      recentCampaigns,
      recentApplications,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
