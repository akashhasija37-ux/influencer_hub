import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { platform } = req.query;
  const { username, campaignId } = req.body;

  // 🔌 YOUR 3RD PARTY API CALL HERE
  const data = await fetchExternalInfluencerData(platform as string, username);

  // Save to DB
  await db.influencerCampaign.create({
    data: {
      campaignId,
      platform,
      username,
      followers: data.followers,
      engagement: data.engagement,
      appliedAt: new Date(),
    },
  });

  res.json({ success: true });
}
