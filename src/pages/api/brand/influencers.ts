import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

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
      niche,
      minFollowers,
      minEngagement,
      country,
      page = "1",
      limit = "10",
    } = req.query;

    console.log(req.query,'0000000')

    const influencers = await prisma.influencer.findMany({
      where: {
        connected: true,

        AND: [
          search
            ? {
                OR: [
    { username: { contains: String(search) } },
    { name: { contains: String(search) } },
  ],
              }
            : {},

          platform ? { platform: String(platform).toUpperCase() as any } : {},

         
       

          minFollowers
            ? { followers: { gte: Number(minFollowers) } }
            : {},

          minEngagement
            ? { engagementRate: { gte: Number(minEngagement) } }
            : {},

          
        ],
      },

      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),

      orderBy: {
        followers: "desc",
      },
    });

    const total = await prisma.influencer.count();

    res.status(200).json({
      data: influencers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
