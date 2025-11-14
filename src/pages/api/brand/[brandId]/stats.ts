import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the dynamic [brandId] from the URL
  const { brandId } = req.query;

  if (typeof brandId !== 'string') {
    return res.status(400).json({ message: 'Invalid brand ID' });
  }

  if (req.method === 'GET') {
    try {
      // 1. Count total campaigns for this brand
      const totalCampaigns = await prisma.campaign.count({
        where: {
          brandId: brandId,
        },
      });

      // 2. Count active campaigns
      const activeCampaigns = await prisma.campaign.count({
        where: {
          brandId: brandId,
          // We'd need to add a 'status' field to our Campaign model
          // status: 'Active', 
        },
      });
      
      // 3. Count total applications for this brand's campaigns
      const totalApplications = await prisma.application.count({
        where: {
          campaign: {
            brandId: brandId,
          },
        },
      });

      // 4. Calculate total engagement (this is more complex)
      // For now, we'll just send a static number.
      const engagement = 8.4;

      // 5. Send all stats back as a single object
      res.status(200).json({
        totalCampaigns,
        activeCampaigns,
        totalApplications,
        engagement,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching brand stats' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}