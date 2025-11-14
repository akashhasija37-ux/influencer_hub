import Head from 'next/head';
import { Download, ChevronDown, MoreHorizontal } from 'lucide-react';

// This is the static data from your screenshot
const brandsData = [
  {
    name: 'TechGear Pro',
    avatarInitial: 'TP',
    industry: 'Technology',
    campaigns: 8,
    applications: 156,
    engagement: 6.2,
    totalSpend: '$12,450',
  },
  {
    name: 'FitLife Nutrition',
    avatarInitial: 'FN',
    industry: 'Health & Fitness',
    campaigns: 12,
    applications: 284,
    engagement: 7.8,
    totalSpend: '$18,920',
  },
  {
    name: 'Urban Fashion Co',
    avatarInitial: 'UFC',
    industry: 'Fashion',
    campaigns: 6,
    applications: 198,
    engagement: 5.4,
    totalSpend: '$9,680',
  },
  {
    name: 'GreenEarth Cosmetics',
    avatarInitial: 'GC',
    industry: 'Beauty',
    campaigns: 10,
    applications: 342,
    engagement: 8.1,
    totalSpend: '$15,780',
  },
  {
    name: 'TravelQuest',
    avatarInitial: 'T',
    industry: 'Travel',
    campaigns: 5,
    applications: 124,
    engagement: 4.7,
    totalSpend: '$7,250',
  },
];

export default function BrandsPage() {
  return (
    <>
      <Head>
        <title>Brand Management - Influencer Hub</title>
      </Head>

      {/* Header and Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Brand Management
          </h1>
          <p className="text-gray-500 mt-1">
            Monitor and manage brand accounts
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center bg-white border rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            All Industries
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          <button className="flex items-center bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Brand Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaigns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spend
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {brandsData.map((brand) => (
                <tr key={brand.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                          {brand.avatarInitial}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {brand.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {brand.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {brand.campaigns}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {brand.applications}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    {brand.engagement}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {brand.totalSpend}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
