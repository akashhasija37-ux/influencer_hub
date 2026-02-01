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

    const brands = await prisma.brand.findMany({
      include: {
        campaign: {
          select: { id: true },
        },
      },
      orderBy: {
        name: "asc", // ✅ VALID FIELD
      },
    });

    const formatted = brands.map((b) => ({
      id: b.id,
      name: b.name,
      avatarInitial:
        b.avatarInitial ??
        b.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      industry: b.industry,
      campaigns: b.campaigns.length,
      applications: 0,
      engagement: 0,
      totalSpend: `$${b.totalSpend ?? 0}`,
    }));

    return res.status(200).json(formatted);
  } catch (err: any) {
    console.error("Admin Brands API Error:", err);

    if (err.code?.includes("JWT")) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}
