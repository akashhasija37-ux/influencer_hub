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
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };

    if (decoded.role !== "INFLUENCER") {
      return res.status(403).json({ message: "Forbidden" });
    }

    /* ================= GET ================= */
    if (req.method === "GET") {
      const influencer = await prisma.influencer.findUnique({
        where: { userId: decoded.userId },
        select: { id: true },
      });

      if (!influencer) {
        return res.status(200).json([]);
      }

      const applications = await prisma.application.findMany({
        where: {
          influencerId: influencer.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          status: true,
          campaign: {
            select: {
              title: true,
            },
          },
        },
      });

      const response = applications.map(app => ({
        id: app.id,
        campaign: app.campaign.title,
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
    console.error("INFLUENCER APPLICATIONS ERROR:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
