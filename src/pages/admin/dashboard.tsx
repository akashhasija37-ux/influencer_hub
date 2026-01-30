import Head from "next/head";
import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import CampaignChart from "@/components/CampaignChart";
import RevenueChart from "@/components/RevenueChart";
import {
  Users,
  Building,
  Target,
  FileText,
  DollarSign,
  Eye,
  TrendingUp,
  ShoppingCart,
  User,
  Star,
  Download,
} from "lucide-react";

type DashboardData = {
  stats: {
    totalBrands: number;
    totalInfluencers: number;
    activeCampaigns: number;
    totalApplications: number;
    paidSubscriptions: number;
    revenue: number;
    profileViews: number;
    engagementRate: number;
  };
  recentCampaigns: {
    id: string;
    title: string;
    brand: { name: string };
  }[];
  recentApplications: {
    id: string;
    influencer: { username: string };
    campaign: { title: string };
  }[];
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  if (!data) {
    return <p className="text-red-500">Failed to load dashboard</p>;
  }

  const { stats, recentCampaigns, recentApplications } = data;

  return (
    <>
      <Head>
        <title>Dashboard - Influencer Hub</title>
      </Head>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor platform performance and key metrics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Brands" value={stats.totalBrands} icon={Building} />
        <StatCard title="Total Influencers" value={stats.totalInfluencers} icon={Users} />
        <StatCard title="Active Campaigns" value={stats.activeCampaigns} icon={Target} />
        <StatCard title="Applications" value={stats.totalApplications} icon={FileText} />
        <StatCard title="Paid Subscriptions" value={stats.paidSubscriptions} icon={ShoppingCart} />
        <StatCard title="Platform Revenue" value={`$${stats.revenue}`} icon={DollarSign} />
        <StatCard title="Profile Views" value={stats.profileViews} icon={Eye} />
        <StatCard title="Engagement Rate" value={`${stats.engagementRate}%`} icon={TrendingUp} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
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

        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Platform Revenue
          </h2>
          <div className="h-80">
            <RevenueChart />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-4">
            {recentCampaigns.map((c) => (
              <li key={c.id} className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{c.brand.name}</span> posted
                  campaign <strong>{c.title}</strong>
                </p>
              </li>
            ))}

            {recentApplications.map((a) => (
              <li key={a.id} className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm text-gray-700">
                  <strong>@{a.influencer.username}</strong> applied to{" "}
                  <strong>{a.campaign.title}</strong>
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscription Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Subscription Plans
          </h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="flex items-center text-sm text-gray-700">
                <Star className="w-4 h-4 mr-2" />
                Free
              </span>
              <span className="font-semibold">458</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex items-center text-sm text-gray-700">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                Premium
              </span>
              <span className="font-semibold">312</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex items-center text-sm text-gray-700">
                <Star className="w-4 h-4 text-purple-600 mr-2" />
                Pro
              </span>
              <span className="font-semibold">126</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
