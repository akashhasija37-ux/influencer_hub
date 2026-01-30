import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state } = req.query;

  // Exchange code → token
  const tokenRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?` +
      new URLSearchParams({
        client_id: process.env.INSTAGRAM_CLIENT_ID!,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
        code: String(code),
      })
  );

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  // Get IG Business ID
  const pageRes = await fetch(
    `https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`
  );
  const pageData = await pageRes.json();
  const igId = pageData.data[0].instagram_business_account.id;

  // Fetch IG profile
  const igRes = await fetch(
    `https://graph.facebook.com/v19.0/${igId}?fields=username,media_count&access_token=${accessToken}`
  );
  const igData = await igRes.json();

  await prisma.influencer.upsert({
    where: { username: igData.username },
    update: {
      igId,
      mediaCount: igData.media_count,
      accessToken,
      connected: true,
    },
    create: {
      username: igData.username,
      igId,
      mediaCount: igData.media_count,
      followers: Math.floor(Math.random() * 500000),
      engagementRate: 6.5,
      accessToken,
      connected: true,
    },
  });

  res.redirect(`/influencers?connected=${igData.username}`);
}
