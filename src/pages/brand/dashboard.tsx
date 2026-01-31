import Head from 'next/head';
import { useEffect, useState } from 'react';
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
import RevenueChart from '@/components/RevenueChart';

/* ===================== COMPONENTS (UNCHANGED) ===================== */

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

/* ===================== PAGE ===================== */

export default function BrandDashboard() {
  const [stats, setStats] = useState<any>({});
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);

  /* ---------- FETCH DASHBOARD DATA ---------- */
  useEffect(() => {
    fetch('/api/brand/stats', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setStats(data.stats);
        setCampaigns(data.campaigns || []);
        setApplications(data.applications || []);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Brand Dashboard - Influencer Hub</title>
      </Head>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <TopStatCard title="Total Campaigns Posted" value={stats.totalCampaigns || 0} change="15" isPositive />
        <TopStatCard title="Active Campaigns" value={stats.activeCampaigns || 0} change="5" isPositive={false} />
        <TopStatCard title="Applications Received" value={stats.applications || 0} change="24" isPositive />
        <TopStatCard title="Engagement Rate" value={`${stats.engagementRate || 0}%`} change="1.2" isPositive />
      </div>

      {/* Analytics Section */}
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Analytics Filters</h2>
          <button className="flex items-center text-purple-600 text-sm font-medium">
            <Filter className="w-4 h-4 mr-1" />
            Your Brand Analytics
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <AnalyticsStatCard title="Campaigns" value={stats.totalCampaigns || 0} icon={<Target className="w-5 h-5 text-purple-600" />} />
            <AnalyticsStatCard title="Impressions" value={stats.impressions || '0'} icon={<Eye className="w-5 h-5 text-purple-600" />} />
            <AnalyticsStatCard title="Total Reach" value={stats.reach || '0'} icon={<Users className="w-5 h-5 text-purple-600" />} />
            <AnalyticsStatCard title="Engagement" value={`${stats.engagementRate || 0}%`} icon={<TrendingUp className="w-5 h-5 text-purple-600" />} />
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-purple-600 text-white p-5 rounded-lg flex items-center mb-6">
        <Zap className="w-6 h-6 mr-4" />
        <p className="text-sm">
          Based on insights for {stats.totalCampaigns || 0} campaigns with {stats.applications || 0} applications.
        </p>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Performance Analytics - Daily View
        </h2>
        <div className="h-80">
          <RevenueChart />
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {campaigns.map((c, i) => (
          <CampaignCard
            key={i}
            title={c.title}
            imageUrl={c.imageUrl}
            impressions={c.impressions}
            reach={c.reach}
            engagement={c.engagement}
          />
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 p-6">Recent Applications</h2>
        <table className="min-w-full">
          <tbody className="divide-y divide-gray-200">
            {applications.map((app, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                      {app.initials}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.followers} followers</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-green-600">{app.engagement}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{app.reach}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
