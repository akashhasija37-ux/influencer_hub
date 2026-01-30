import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }

  const cleanUsername = String(username).replace("@", "").toLowerCase();

  const influencer = await prisma.influencer.findUnique({
    where: { username: cleanUsername },
  });

  if (influencer) {
    return res.json(influencer);
  }

  // First-time user → OAuth
  return res.json({
    requiresAuth: true,
    authUrl: `/api/influencers/oauth?username=${cleanUsername}`,
  });
}
