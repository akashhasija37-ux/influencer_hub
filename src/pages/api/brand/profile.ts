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

    // ✅ Verify JWT properly
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };

    if (!decoded.userId || decoded.role !== "BRAND") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    /* ================= GET ================= */
    if (req.method === "GET") {
      const brand = await prisma.brand.findUnique({
        where: { userId: decoded.userId },
      });

      return res.status(200).json(brand);
    }

    /* ================= PUT ================= */
    if (req.method === "PUT") {
      // ✅ FIELD WHITELIST (VERY IMPORTANT)
      const data = {
        name: req.body.name,
        industry: req.body.industry,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
        description: req.body.description,
        addressLine1: req.body.addressLine1,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        postalCode: req.body.postalCode,
        instagramUrl: req.body.instagramUrl,
        facebookUrl: req.body.facebookUrl,
        threadsUrl: req.body.threadsUrl,
        twitterUrl: req.body.twitterUrl,
        linkedinUrl: req.body.linkedinUrl,
        youtubeUrl: req.body.youtubeUrl,
      };

      const brand = await prisma.brand.upsert({
        where: { userId: decoded.userId },
        update: data,
        create: {
          ...data,
          userId: decoded.userId,
          avatarInitial: data.name?.charAt(0) || "B",
        },
      });

      return res.status(200).json(brand);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("BRAND PROFILE ERROR:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
