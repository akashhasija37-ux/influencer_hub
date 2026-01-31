import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    /* ================= AUTH ================= */
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

    /* ================= BRAND ================= */
    const brand = await prisma.brand.findUnique({
      where: { userId: decoded.userId },
      select: { id: true },
    });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    /* ================= GET ================= */
    if (req.method === "GET") {
      const applications = await prisma.application.findMany({
        where: {
          campaign: {
            brandId: brand.id,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          status: true,
          createdAt: true,

          campaign: {
            select: {
              title: true,
              platforms: true,
            },
          },

          influencer: {
            select: {
              username: true,
             connected:true,
              followers: true,
              engagementRate: true,
              mediaCount: true,
            },
          },
        },
      });

      /* ================= TRANSFORM FOR UI ================= */
      const response = applications.map((app) => ({
        id: app.id,
        name: app.influencer.username,
        avatar:
         
          `https://placehold.co/48x48/7c3aed/ffffff?text=${app.influencer.username
            .charAt(0)
            .toUpperCase()}`,
        platformIcon:
          app.campaign.platforms === "INSTAGRAM"
            ? "📷"
            : app.campaign.platforms === "YOUTUBE"
            ? "▶️"
            : "🎵",
        age: app.influencer.mediaCount || "--",
        campaign: app.campaign.title,
        appliedDate: app.createdAt.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        followers: app.influencer.followers
          ? `${Math.round(app.influencer.followers / 1000)}K`
          : "--",
        engagement: app.influencer.engagementRate
          ? `${app.influencer.engagementRate}%`
          : "--",
        
        status:
          app.status === "PENDING"
            ? "Pending"
            : app.status === "ACCEPTED"
            ? "Accepted"
            : "Rejected",
      }));

      return res.status(200).json(response);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("BRAND APPLICATIONS ERROR:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
