import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // We only want to handle POST requests
  if (req.method === 'POST') {
    try {
      // 1. Get the data from the request body
      const data = req.body;

      // TODO: Add authentication here
      // For now, we'll hardcode a brandId
      const hardcodedBrandId = 'clxkoo9fn0000abcde1234567'; // Replace with a real Brand ID from your DB

      // 2. Create the new campaign in the database
      const newCampaign = await prisma.campaign.create({
        data: {
    title: data.campaignTitle,
    description: data.description,
    niche: data.niche,
    budgetRange: data.budgetRange,
    platforms: data.platforms, // e.g. ["INSTAGRAM"]
    deliverables: data.deliverables,
    deadline: new Date(data.deadline),
    status: "PUBLISHED",
    brandId: hardcodedBrandId,
  },
      });

      // 3. Send the newly created campaign back
      res.status(201).json(newCampaign);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating campaign' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}