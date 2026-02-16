import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const SEARCH_API_KEY = process.env.SEARCHAPI_KEY!; // move key to env

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

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

    console.log(decoded,'oooooooooooo')

    if (decoded.role !== "INFLUENCER") {
      return res.status(403).json({ message: "Forbidden" });
    }
    

    const { campaignId, platform, username } = req.body;

    console.log(platform,'999999999')

    if (!campaignId || !platform || !username) {
      return res.status(400).json({ message: "Missing fields" });
    }

    /* ================= 1. CALL SEARCHAPI ================= */
    let profileData: any = null;

    let topPost: string | null = null;

    if (platform === "INSTAGRAM") {
      const apiRes = await fetch(
        `https://www.searchapi.io/api/v1/search?engine=instagram_profile&username=${username}&api_key=${SEARCH_API_KEY}`
      );

      const apiJson = await apiRes.json();
      profileData = apiJson?.profile;

      if (apiJson?.posts && apiJson.posts.length > 0) {
    topPost =
      apiJson.posts[0].thumbnail ||
      apiJson.posts[0].link ||
      null;
  }
    }

    

    if (!profileData) {
      return res.status(400).json({ message: "Failed to fetch profile data" });
    }

    /* ================= 2. EXTRACT METRICS ================= */
    const followers = profileData.followers || 0;
    const following = profileData.following || 0;
    const posts = profileData.posts || 0;

    const engagementRate =
  followers > 0 ? Number(((posts / followers) * 100).toFixed(2)) : 0;


   const avatarUrl = profileData.avatar_hd || profileData.avatar || null;
const fullName = profileData.name || username;

    /* ================= 3. UPSERT INFLUENCER ================= */
    /* ================= 3. UPSERT INFLUENCER ================= */
const influencer = await prisma.influencer.upsert({
  where: {
    userId: decoded.userId,
  },
  update: {
    platform,
    username,
    name : fullName,        // ⭐ NEW
    avatar: avatarUrl, // ⭐ NEW
    topPost,         //
    followers,
    mediaCount: posts,
    engagementRate: Number(engagementRate),
    connected: true,                          // ✅ mark connected
  },
  create: {
    userId: decoded.userId,
    platform,        // ✅ REQUIRED
    username,
    name : fullName,      // ⭐ NEW
    avatar: avatarUrl, // ⭐ NEW
    topPost, 
    followers,
    mediaCount: posts,
    engagementRate: Number(engagementRate),
    connected: true,
  },
});


    /* ================= 4. CREATE APPLICATION ================= */
    const existing = await prisma.application.findFirst({
      where: {
        campaignId,
        influencerId: influencer.id,
      },
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    await prisma.application.create({
      data: {
        campaignId,
        influencerId: influencer.id,
        status: "PENDING",
      },
    });

    return res.status(200).json({ message: "Applied successfully" });
  } catch (error) {
    console.error("APPLY CAMPAIGN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
