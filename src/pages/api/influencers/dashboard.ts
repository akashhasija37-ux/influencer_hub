import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const user = await jwtVerify(req, res);
  if (!user || user.role !== "INFLUENCER") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const influencer = await prisma.influencer.findUnique({
    where: { userId: user.id },
    include: {
      application: true,
    },
  });

  if (!influencer) {
    return res.status(404).json({ message: "Influencer not found" });
  }

  const approved = influencer.application.filter(
    (a) => a.status === "APPROVED"
  ).length;

  res.json({
    username: influencer.username,
    platform: influencer.platform,
    followers: influencer.followers,
    connected: influencer.connected,
    totalApplications: influencer.application.length,
    approvedApplications: approved,
  });
}
