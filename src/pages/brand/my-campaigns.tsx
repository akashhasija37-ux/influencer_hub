import Head from 'next/head';
import {
  Plus,
  Search,
  SlidersHorizontal,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  BarChart,
  CheckCircle,
  FileText,
  Briefcase,
  Check,
  File,
} from 'lucide-react';
import React from 'react';

// --- Internal Component: StatCard ---
// For the 4 stats at the top
const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ElementType }) => {
  const Icon = icon;
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="p-3 bg-purple-100 rounded-lg">
        <Icon className="w-6 h-6 text-purple-600" />
      </div>
    </div>
  );
};

// --- Internal Component: CampaignStatusTag ---
// For "Active", "Completed", "Draft" tags
const CampaignStatusTag = ({ status }: { status: string }) => {
  let styles = '';
  switch (status) {
    case 'Active':
      styles = 'bg-green-100 text-green-800';
      break;
    case 'Completed':
      styles = 'bg-blue-100 text-blue-800';
      break;
    case 'Draft':
      styles = 'bg-gray-200 text-gray-800';
      break;
  }
  return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles}`}>{status}</span>;
};

// --- Internal Component: CampaignCard ---
// This is the main card for each campaign
const CampaignCard = ({ campaign }: { campaign: any }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    {/* Card Header */}
    <div className="flex justify-between items-center p-5 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <h2 className="text-xl font-semibold text-gray-900">{campaign.title}</h2>
        <CampaignStatusTag status={campaign.status} />
        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{campaign.category}</span>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>

    {/* Card Body */}
    <div className="p-5">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Campaign Progress</span>
          <span className="text-sm font-bold text-gray-800">{campaign.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${campaign.progress}%` }}></div>
        </div>
      </div>

      {/* Platform Info Grid */}
      <div className="grid grid-cols-5 gap-4 py-4 border-y border-gray-200 text-sm">
        <div>
          <p className="text-gray-500">Platform</p>
          <p className="font-semibold text-gray-800">{campaign.platform}</p>
        </div>
        <div>
          <p className="text-gray-500">Budget</p>
          <p className="font-semibold text-gray-800">{campaign.budget}</p>
        </div>
        <div>
          <p className="text-gray-500">Deadline</p>
          <p className="font-semibold text-gray-800">{campaign.deadline}</p>
        </div>
        <div>
          <p className="text-gray-500">Applications</p>
          <p className="font-semibold text-gray-800">{campaign.applications}</p>
        </div>
        <div>
          <p className="text-gray-500">Accepted</p>
          <p className="font-semibold text-gray-800">{campaign.accepted}</p>
        </div>
      </div>

      {/* Analytics Info */}
      <div className="flex items-center space-x-6 pt-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-purple-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Engagement</p>
            <p className="text-lg font-bold text-gray-800">{campaign.engagement}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-purple-50 rounded-lg">
            <BarChart className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Reach</p>
            <p className="text-lg font-bold text-gray-800">{campaign.reach}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Card Footer Actions */}
    <div className="flex justify-end items-center space-x-3 p-5 bg-gray-50 border-t border-gray-200">
      <button className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
        <Eye className="w-4 h-4 mr-2" /> View
      </button>
      <button className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
        <Edit className="w-4 h-4 mr-2" /> Edit
      </button>
      <button className="flex items-center bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-100">
        <Trash2 className="w-4 h-4 mr-2" /> Delete
      </button>
    </div>
  </div>
);

// --- Static Data for the Page ---
const campaignsData = [
  {
    title: 'Summer Fashion Collection Launch',
    status: 'Active',
    category: 'Fashion & Beauty',
    progress: 65,
    platform: 'Instagram',
    budget: '$50,000',
    deadline: 'Nov 15, 2025',
    applications: 23,
    accepted: 2,
    engagement: '8.2%',
    reach: '420K',
  },
  {
    title: 'Tech Product Review Campaign',
    status: 'Active',
    category: 'Tech & Gadgets',
    progress: 45,
    platform: 'YouTube',
    budget: '$80,000',
    deadline: 'Nov 20, 2025',
    applications: 38,
    accepted: 1,
    engagement: '12.5%',
    reach: '980K',
  },
  {
    title: 'Fitness Equipment Promotion',
    status: 'Completed',
    category: 'Fitness & Health',
    progress: 100,
    platform: 'Instagram',
    budget: '$65,000',
    deadline: 'Oct 30, 2025',
    applications: 31,
    accepted: 3,
    engagement: '9.1%',
    reach: '650K',
  },
  {
    title: 'Travel Accessories Launch',
    status: 'Draft',
    category: 'Travel & Lifestyle',
    progress: 0,
    platform: 'Instagram',
    budget: '$35,000',
    deadline: 'Dec 1, 2025',
    applications: 0,
    accepted: 0,
    engagement: 'N/A',
    reach: 'N/A',
  },
];

// --- Main Page Component ---
export default function MyCampaignsPage() {
  return (
    <>
      <Head>
        <title>My Campaigns - Influencer Hub</title>
      </Head>

      {/* Header and Action Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Campaigns</h1>
          <p className="text-gray-500 mt-1">
            Manage and track all your influencer campaigns
          </p>
        </div>
        <button className="flex items-center bg-purple-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-purple-700">
          <Plus className="w-5 h-5 mr-2" />
          Create New Campaign
        </button>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Campaigns" value="24" icon={Briefcase} />
        <StatCard title="Active" value="8" icon={Check} />
        <StatCard title="Completed" value="14" icon={CheckCircle} />
        <StatCard title="Drafts" value="2" icon={File} />
      </div>

      {/* Search and Filter Bar */}
      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="search"
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center text-sm text-gray-600">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filter
          </button>
          <div className="relative">
            <select
              className="appearance-none rounded-lg border border-gray-300 p-2 text-sm focus:outline-none bg-white pr-8"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Draft</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Campaign Cards List */}
      <div className="space-y-6">
        {campaignsData.map((campaign) => (
          <CampaignCard key={campaign.title} campaign={campaign} />
        ))}
      </div>
    </>
  );
}