import Head from 'next/head';
import {
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MessageSquare,
  Heart,
  Share,
  AlertTriangle,
  Zap,
  CheckCircle,
  BarChart,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import React from 'react';
import CampaignChart from '@/components/CampaignChart'; // Reusing this for the main chart

// --- Internal Component: StatCard ---
const StatCard = ({ title, value, change, isPositive }: any) => (
  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
      <span>{change} vs last week</span>
    </div>
  </div>
);

// --- Internal Component: AuthenticityStat ---
const AuthenticityStat = ({ title, value, info, icon }: any) => {
  const Icon = icon;
  return (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
      <Icon className="w-5 h-5 text-gray-400 mt-1" />
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{info}</p>
      </div>
    </div>
  );
};

// --- Internal Component: PostCard ---
const PostCard = ({ post }: { post: any }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="relative">
      <img src={post.image} alt="Post image" className="h-64 w-full object-cover" />
      <div className="absolute top-2 right-2 flex space-x-1">
        {post.isNew && (
          <span className="text-xs font-semibold bg-blue-500 text-white px-2 py-0.5 rounded-full">New</span>
        )}
        {post.isTop && (
          <span className="text-xs font-semibold bg-green-500 text-white px-2 py-0.5 rounded-full">Top</span>
        )}
      </div>
      <div className="absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black/60 to-transparent w-full">
        <p className="text-sm font-semibold text-white">{post.title}</p>
      </div>
    </div>
    <div className="p-3 flex justify-around text-center border-t border-gray-100">
      <div>
        <p className="text-sm font-bold">{post.likes}</p>
        <p className="text-xs text-gray-500">Likes</p>
      </div>
      <div>
        <p className="text-sm font-bold">{post.comments}</p>
        <p className="text-xs text-gray-500">Comments</p>
      </div>
      <div>
        <p className="text-sm font-bold">{post.shares}</p>
        <p className="text-xs text-gray-500">Shares</p>
      </div>
    </div>
  </div>
);

// --- Static Data ---
const postData = [
  {
    image: 'https://placehold.co/400x600/0d9488/ffffff?text=Post+1&font=inter',
    title: 'Day 5 Outfit',
    likes: '62K',
    comments: '1.1K',
    shares: '382',
    isNew: true,
    isTop: false,
  },
  {
    image: 'https://placehold.co/400x600/f43f5e/ffffff?text=Post+2&font=inter',
    title: 'Wardrobe Essentials',
    likes: '88K',
    comments: '2.4K',
    shares: '512',
    isNew: true,
    isTop: true,
  },
  {
    image: 'https://placehold.co/400x600/eab308/ffffff?text=Post+3&font=inter',
    title: 'Closet Tour',
    likes: '45K',
    comments: '800',
    shares: '201',
    isNew: false,
    isTop: false,
  },
  {
    image: 'https://placehold.co/400x600/3b82f6/ffffff?text=Post+4&font=inter',
    title: 'Summer Yellow',
    likes: '71K',
    comments: '1.9K',
    shares: '450',
    isNew: false,
    isTop: false,
  },
];


// --- Main Page Component ---
export default function InfluencerAnalyticsPage() {
  return (
    <>
      <Head>
        <title>Influencer Analytics - Influencer Hub</title>
      </Head>

      {/* Influencer Header */}
      <div className="flex justify-between items-center mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="https://placehold.co/100x100/e9d5ff/ffffff?text=SJ&font=inter"
            alt="Sarah Johnson"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-800">Sarah Johnson</h1>
              <CheckCircle className="w-5 h-5 text-blue-500 fill-current" />
              <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Invited</span>
            </div>
            <p className="text-gray-500">Fashion & Beauty • @sarah_johnson</p>
          </div>
        </div>
        <button className="flex items-center bg-purple-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-purple-700">
          <MessageSquare className="w-4 h-4 mr-2" />
          Message Influencer
        </button>
      </div>

      {/* Analytics Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
          <div className="relative">
            <select className="w-full appearance-none rounded-lg border border-gray-300 p-2 text-sm focus:outline-none bg-white pr-8">
              <option>Instagram</option>
              <option>YouTube</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
          <div className="relative">
            <select className="w-full appearance-none rounded-lg border border-gray-300 p-2 text-sm focus:outline-none bg-white pr-8">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Followers" value="24.6K" change="+1.2K" isPositive={true} />
        <StatCard title="Engagement" value="8.6%" change="-0.5%" isPositive={false} />
        <StatCard title="Impressions" value="420K" change="+22K" isPositive={true} />
        <StatCard title="Avg. Likes" value="4.6K" change="+150" isPositive={true} />
      </div>

      {/* Authenticity Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Authenticity Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <AuthenticityStat title="Fake Followers" value="2.1K" info="Estimated (12.4% total)" icon={Users} />
          <AuthenticityStat title="Fake Likes" value="~300" info="Estimated (12% per post)" icon={Heart} />
          <AuthenticityStat title="Fake Comments" value="~50" info="Estimated (8% per post)" icon={MessageSquare} />
        </div>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold">Disclaimer: Metrics are AI-estimated</h3>
              <p className="text-sm">This is an estimate and may not be 100% precise. Our AI uses multiple factors and variation (rate, location) to determine these metrics.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Authenticity Score (Avg)</p>
            <p className="text-2xl font-bold text-green-600">92/100</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Engagement (Auth.)</p>
            <p className="text-2xl font-bold text-gray-800">8.2%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Account Quality (Est.)</p>
            <p className="text-2xl font-bold text-green-600">Good</p>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-purple-600 text-white p-5 rounded-lg mb-6 flex items-center space-x-4">
        <Zap className="w-8 h-8 flex-shrink-0" />
        <div>
          <h3 className="font-semibold">AI Insights for Instagram</h3>
          <p className="text-sm text-purple-200">Total follower growth increased by 10% this week. Engagement is highest on Day 2 & 5 with an avg. of 8.8%.</p>
        </div>
      </div>

      {/* Performance Analytics Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Analytics - Daily View</h2>
        <div className="h-80">
          <CampaignChart />
        </div>
      </div>

      {/* Post Performance */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Post Performance</h2>
          <div className="flex items-center space-x-4">
            {/* ... Filters for Post Performance ... */}
            <span className="text-sm text-gray-600">1 / 4</span>
            <button className="p-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {postData.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}