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

    const campaigns = await prisma.campaign.findMany({
      include: {
        brand: {
          select: { name: true },
        },
        applications: {
          select: { id: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = campaigns.map((c) => ({
      id: c.id,
      name: c.title,
      brand: c.brand.name,
      applications: c.applications.length,
    }));

    return res.status(200).json(formatted);
  } catch (err) {
    console.error("Admin Campaign API Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
