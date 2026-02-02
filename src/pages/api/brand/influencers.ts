import { NextApiRequest, NextApiResponse } from "next";
import { prisma, Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      search,
      platform,
      minFollowers,
      minEngagement,
      page = "1",
      limit = "10",
    } = req.query;

    // ✅ STRICTLY TYPED WHERE
    const where: Prisma.InfluencerWhereInput = {
      connected: true,
      AND: [],
    };

    // ✅ SEARCH (USERNAME ONLY)
    if (search) {
      where.AND!.push({
        username: {
          contains: String(search),
          mode: "insensitive",
        },
      });
    }

    // ✅ PLATFORM
    if (platform) {
      where.AND!.push({
        platform: String(platform).toUpperCase() as any,
      });
    }

    // ✅ FOLLOWERS
    if (minFollowers) {
      where.AND!.push({
        followers: {
          gte: Number(minFollowers),
        },
      });
    }

    // ✅ ENGAGEMENT
    if (minEngagement) {
      where.AND!.push({
        engagementRate: {
          gte: Number(minEngagement),
        },
      });
    }

    const influencers = await prisma.influencer.findMany({
      where,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: {
        followers: "desc",
      },
    });

    const total = await prisma.influencer.count({ where });

    res.status(200).json({
      data: influencers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
      },
    });
  } catch (error) {
    console.error("INFLUENCER FETCH ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
}
