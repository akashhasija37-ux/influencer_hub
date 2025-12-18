import Head from 'next/head';
import StatCard from '@/components/StatCard';
import CampaignChart from '@/components/CampaignChart';
import RevenueChart from '@/components/RevenueChart';
import {
  Users,
  Building,
  Target,
  FileText,
  DollarSign,
  Eye,
  TrendingUp,
  BarChart,
  ShoppingCart,
  CheckCircle,
  Activity,
  User,
  Star,
  Download,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard - Influencer Hub</title>
      </Head>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">
          Monitor platform performance and key metrics
        </p>
      </div>

      {/* 8-Card Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Brands"
          value="1,284"
          icon={Building}
          change="+12.5%"
          isPositive={true}
        />
        <StatCard
          title="Total Influencers"
          value="5,892"
          icon={Users}
          change="+18.3%"
          isPositive={true}
        />
        <StatCard
          title="Active Campaigns"
          value="342"
          icon={Target}
          change="+8.1%"
          isPositive={true}
        />
        <StatCard
          title="Applications Submitted"
          value="12,456"
          icon={FileText}
          change="+24.7%"
          isPositive={true}
        />
        <StatCard
          title="Paid Subscriptions"
          value="896"
          icon={ShoppingCart}
          change="-2.3%"
          isPositive={false}
        />
        <StatCard
          title="Platform Revenue"
          value="$84,250"
          icon={DollarSign}
          change="+15.8%"
          isPositive={true}
        />
        <StatCard
          title="Profile Views"
          value="28,934"
          icon={Eye}
          change="+32.4%"
          isPositive={true}
        />
        <StatCard
          title="Engagement Rate"
          value="4.8%"
          icon={TrendingUp}
          change="+0.7%"
          isPositive={true}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* Campaign Activity Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Campaign Activity
            </h2>
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
          <div className="h-80">
      <CampaignChart />
    </div>
        </div>

        {/* Platform Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Platform Revenue
          </h2>
            <div className="h-80">
      <RevenueChart />
    </div>
        </div>
      </div>

      {/* Bottom Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">@TechGear Pro</span> posted new
                  campaign "Summer Tech Launch"
                </p>
                <span className="text-xs text-gray-500">3 min ago</span>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">@Sarah Johnson</span> applied to "Summer Tech Launch"
                </p>
                <span className="text-xs text-gray-500">12 min ago</span>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">@FitLife Nutrition</span> upgraded to "Pro Subscription"
                </p>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Subscription Plans */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Subscription Plans
          </h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="flex items-center text-sm text-gray-700">
                <Star className="w-4 h-4 text-gray-400 mr-2" />
                Free
              </span>
              <span className="text-sm font-semibold text-gray-800">458</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex items-center text-sm text-gray-700">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                Premium
              </span>
              <span className="text-sm font-semibold text-gray-800">312</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex items-center text-sm text-gray-700">
                <Star className="w-4 h-4 text-purple-600 mr-2" />
                Pro
              </span>
              <span className="text-sm font-semibold text-gray-800">126</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
