import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // We only want to handle GET requests for this endpoint
  if (req.method === 'GET') {
    try {
      // 1. Get all influencers from the database
      const influencers = await prisma.influencer.findMany({
        // Optional: sort them by name
        orderBy: {
          name: 'asc',
        },
      });

      // 2. Send the data back as JSON
      res.status(200).json(influencers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching influencers' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}