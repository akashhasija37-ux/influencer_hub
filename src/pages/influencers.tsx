import Head from 'next/head';
import { Download, ChevronDown, MoreHorizontal } from 'lucide-react';

// This is the static data from your screenshot
const influencersData = [
  {
    name: 'Sarah Johnson',
    avatarInitial: 'SJ',
    platform: 'Instagram',
    followers: '284K',
    engagement: 5.2,
    lastActive: '2 hours ago',
    campaigns: 12,
    profileViews: 1284,
  },
  {
    name: 'Mike Chen',
    avatarInitial: 'MC',
    platform: 'YouTube',
    followers: '1.2M',
    engagement: 6.8,
    lastActive: '1 day ago',
    campaigns: 8,
    profileViews: 2156,
  },
  {
    name: 'Anna Lee',
    avatarInitial: 'AL',
    platform: 'TikTok',
    followers: '750K',
    engagement: 7.1,
    lastActive: '5 hours ago',
    campaigns: 15,
    profileViews: 1902,
  },
];

// Helper function to style the platform tags
const PlatformTag = ({ platform }: { platform: string }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';

  if (platform === 'Instagram') {
    bgColor = 'bg-pink-100';
    textColor = 'text-pink-800';
  } else if (platform === 'YouTube') {
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
  } else if (platform === 'TikTok') {
    bgColor = 'bg-blue-100';
    textColor = 'text-blue-800';
  }

  return (
    <span
      className={`
        ${bgColor} ${textColor}
        px-3 py-1 rounded-full text-xs font-medium
      `}
    >
      {platform}
    </span>
  );
};

export default function InfluencersPage() {
  return (
    <>
      <Head>
        <title>Influencer Management - Influencer Hub</title>
      </Head>

      {/* Header and Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Influencer Management
          </h1>
          <p className="text-gray-500 mt-1">
            Monitor and manage influencer accounts
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center bg-white border rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            All Platforms
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          <button className="flex items-center bg-white border rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Last 30 Days
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          <button className="flex items-center bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Influencer Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Influencer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Followers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaigns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile Views
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {influencersData.map((influencer) => (
                <tr key={influencer.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                          {influencer.avatarInitial}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {influencer.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PlatformTag platform={influencer.platform} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {influencer.followers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    {influencer.engagement}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {influencer.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {influencer.campaigns}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {influencer.profileViews}
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
