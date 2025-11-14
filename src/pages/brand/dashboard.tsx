import Head from 'next/head';
import {
  TrendingUp,
  TrendingDown,
  Users,
  BarChart,
  Eye,
  Zap,
  Filter,
  ChevronDown,
  ArrowRight,
  MessageSquare,
  Heart,
  Share,
  Target,
} from 'lucide-react';
import RevenueChart from '@/components/RevenueChart'; // Reusing our chart

// Stat card for the top section
const TopStatCard = ({ title, value, change, isPositive }: any) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <span className="text-sm font-medium text-gray-500">{title}</span>
    <div className="flex items-baseline justify-between">
      <span className="text-3xl font-bold text-gray-800">{value}</span>
      <span
        className={`flex items-center text-sm font-medium ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {isPositive ? (
          <TrendingUp className="w-4 h-4 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 mr-1" />
        )}
        {change}%
      </span>
    </div>
    <span className="text-xs text-gray-400">vs last week</span>
  </div>
);

// Stat card for the analytics section
const AnalyticsStatCard = ({ title, value, icon }: any) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-purple-100 rounded-lg">{icon}</div>
      <div>
        <span className="text-sm text-gray-500">{title}</span>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

// Campaign performance card
const CampaignCard = ({ title, imageUrl, impressions, reach, engagement }: any) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            'https://placehold.co/400x300/e2e8f0/64748b?text=Image';
        }}
      />
      <span className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        Instagram
      </span>
      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
        NEW
      </span>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
      <div className="flex justify-between text-sm text-gray-500 mt-3">
        <span className="flex items-center">
          <Heart className="w-4 h-4 mr-1" /> {impressions}
        </span>
        <span className="flex items-center">
          <MessageSquare className="w-4 h-4 mr-1" /> {reach}
        </span>
        <span className="flex items-center">
          <Share className="w-4 h-4 mr-1" /> {engagement}
        </span>
      </div>
    </div>
  </div>
);

export default function BrandDashboard() {
  return (
    <>
      <Head>
        <title>Brand Dashboard - Influencer Hub</title>
      </Head>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <TopStatCard
          title="Total Campaigns Posted"
          value="24"
          change="15"
          isPositive={true}
        />
        <TopStatCard
          title="Active Campaigns"
          value="8"
          change="5"
          isPositive={false}
        />
        <TopStatCard
          title="Applications Received"
          value="142"
          change="24"
          isPositive={true}
        />
        <TopStatCard
          title="Engagement Rate"
          value="8.4"
          change="1.2"
          isPositive={true}
        />
      </div>

      {/* Analytics Filters & Stats */}
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Analytics Filters
          </h2>
          <button className="flex items-center text-purple-600 text-sm font-medium">
            <Filter className="w-4 h-4 mr-1" />
            Your Brand Analytics
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Filters */}
          <div className="md:col-span-1">
            <label className="text-xs font-medium text-gray-500">
              Platform
            </label>
            <button className="w-full flex justify-between items-center text-left mt-1 p-2 border border-gray-300 rounded-lg">
              <span className="text-sm text-gray-700">All Platforms</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="md:col-span-1">
            <label className="text-xs font-medium text-gray-500">
              Time Period
            </label>
            <button className="w-full flex justify-between items-center text-left mt-1 p-2 border border-gray-300 rounded-lg">
              <span className="text-sm text-gray-700">Last 7 Days</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Analytics Stats */}
          <div className="md:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <AnalyticsStatCard
              title="Campaigns"
              value="51"
              icon={<Target className="w-5 h-5 text-purple-600" />}
            />
            <AnalyticsStatCard
              title="Impressions"
              value="1.2M"
              icon={<Eye className="w-5 h-5 text-purple-600" />}
            />
            <AnalyticsStatCard
              title="Total Reach"
              value="3.1M"
              icon={<Users className="w-5 h-5 text-purple-600" />}
            />
            <AnalyticsStatCard
              title="Engagement"
              value="8.4%"
              icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
            />
          </div>
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="bg-purple-600 text-white p-5 rounded-lg flex items-center mb-6">
        <div className="p-2 bg-white bg-opacity-20 rounded-full mr-4">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold">AI Insights for All Platforms</h3>
          <p className="text-sm text-purple-100">
            Based on insights for 51 campaigns with 159 applications, Peak
            engagement is on Day 2 with 8.4% engagement...
          </p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Performance Analytics - Daily View
        </h2>
        <div className="h-80">
          <RevenueChart />
        </div>
      </div>

      {/* Campaign Performance Grid */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Campaign Performance
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">1/3</span>
            <button className="p-2 rounded-full border bg-white hover:bg-gray-100">
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
            <button className="p-2 rounded-full border bg-white hover:bg-gray-100">
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CampaignCard
            title="Caness Equipment Promo"
            imageUrl="https://placehold.co/400x300/a78bfa/ffffff?text=Campaign+Image&font=inter"
            impressions="18.1K"
            reach="15.7K"
            engagement="1.2K"
          />
          <CampaignCard
            title="Travel Accessories"
            imageUrl="https://placehold.co/400x300/fbcfe8/ffffff?text=Campaign+Image&font=inter"
            impressions="12.1K"
            reach="14.0K"
            engagement="980"
          />
          <CampaignCard
            title="Summer Fashion Launch"
            imageUrl="https://placehold.co/400x300/fcd34d/ffffff?text=Campaign+Image&font=inter"
            impressions="22.5K"
            reach="19.2K"
            engagement="2.1K"
          />
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 p-6">
          Recent Applications
        </h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Influencer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Engagement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Est. Reach
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              { name: 'Sarah Johnson', followers: '284K', img: 'SJ', eng: '8.2%', reach: '~$25,000' },
              { name: 'Mike Chen', followers: '1.2M', img: 'MC', eng: '12.5%', reach: '~$35,000' },
              { name: 'Emma Davis', followers: '750K', img: 'ED', eng: '9.0%', reach: '~$30,200' },
              { name: 'Alex Kumar', followers: '120K', img: 'AK', eng: '9.1%', reach: '~$12,000' },
            ].map((app) => (
              <tr key={app.name} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                      {app.img}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.followers} followers</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-green-600">{app.eng}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{app.reach}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}