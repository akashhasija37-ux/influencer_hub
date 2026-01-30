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

    const influencers = await prisma.influencer.findMany({
      include: {
        user: {
          select: { email: true },
        },
      },
    });

    return res.status(200).json(influencers);
  } catch (err) {
    console.error("Admin API auth error:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
}
