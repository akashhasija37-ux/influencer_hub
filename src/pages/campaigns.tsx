import Head from 'next/head';
import { Download, MoreHorizontal, BarChart, TrendingUp } from 'lucide-react';
import CampaignChart from '@/components/CampaignChart'; // Reusing our bar chart
import RevenueChart from '@/components/RevenueChart'; // Reusing our area chart

// Static data for the top campaigns list
const topCampaigns = [
  {
    name: 'Summer Tech Launch',
    brand: 'TechGear Pro',
    applications: 342,
    color: 'bg-purple-600',
    width: 'w-11/12',
  },
  {
    name: 'Fall Collection 2025',
    brand: 'Urban Fashion',
    applications: 298,
    color: 'bg-purple-600',
    width: 'w-9/12',
  },
  {
    name: 'Fitness Challenge',
    brand: 'FitLife Nutrition',
    applications: 276,
    color: 'bg-purple-600',
    width: 'w-8/12',
  },
  {
    name: 'Beauty Routine',
    brand: 'GreenEarth Cosmetics',
    applications: 234,
    color: 'bg-purple-600',
    width: 'w-7/12',
  },
  {
    name: 'Travel Vlogs',
    brand: 'TravelQuest',
    applications: 198,
    color: 'bg-purple-600',
    width: 'w-6/12',
  },
];

export default function CampaignsPage() {
  return (
    <>
      <Head>
        <title>Campaign Management - Influencer Hub</title>
      </Head>

      {/* Header and Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Campaign Management
          </h1>
          <p className="text-gray-500 mt-1">
            Track all platform campaigns
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Campaigns Posted (Monthly) Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Campaigns Posted (Monthly)
          </h2>
          <div className="h-80">
            <CampaignChart />
          </div>
        </div>

        {/* Applications Received Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Applications Received
          </h2>
          <div className="h-80">
            {/* We reuse the RevenueChart component for this area chart */}
            <RevenueChart />
          </div>
        </div>
      </div>

      {/* Top Campaigns List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Top Campaigns by Applications
        </h2>
        <ul className="space-y-6">
          {topCampaigns.map((campaign, index) => (
            <li key={campaign.name}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="text-sm font-bold text-gray-500 mr-3">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {campaign.name}
                    </p>
                    <p className="text-xs text-gray-500">{campaign.brand}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-purple-600 mr-4">
                    {campaign.applications} applications
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${campaign.color} ${campaign.width} h-2 rounded-full`}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
