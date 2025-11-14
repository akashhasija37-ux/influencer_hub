import Head from 'next/head';
import {
  ChevronDown,
  Calendar,
  Check,
  X,
  MessageSquare,
  Trash2,
} from 'lucide-react';
import React from 'react';

// --- Internal Helper Component: FilterDropdown ---
const FilterDropdown = ({ label, options }: { label: string, options: string[] }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1">
      {label}
    </label>
    <div className="relative">
      <select className="w-full appearance-none rounded-lg border border-gray-300 p-2 text-sm focus:outline-none bg-white pr-8">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  </div>
);

// --- Internal Helper Component: StatusTag ---
const StatusTag = ({ status }: { status: string }) => {
  let styles = '';
  switch (status) {
    case 'Pending':
      styles = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Accepted':
      styles = 'bg-green-100 text-green-800';
      break;
    case 'Rejected':
      styles = 'bg-red-100 text-red-800';
      break;
  }
  return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles}`}>{status}</span>;
};

// --- Internal Helper Component: ApplicationItem ---
// This is the main component for each row in the list
const ApplicationItem = ({ app }: { app: any }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-wrap items-center justify-between">
    {/* Left Side: Influencer Info */}
    <div className="flex items-center space-x-3 flex-shrink-0 mr-4 mb-2 md:mb-0">
      <img
        className="h-12 w-12 rounded-full object-cover"
        src={app.avatar}
        alt={app.name}
      />
      <div>
        <div className="flex items-center space-x-2">
          <h3 className="text-md font-semibold text-gray-900">{app.name}</h3>
          <span className="text-xl">{app.platformIcon}</span>
          <span className="text-sm text-gray-500">· {app.age}yrs</span>
        </div>
        <p className="text-sm text-gray-600">
          Applied for: <span className="font-medium text-purple-600">{app.campaign}</span>
        </p>
        <p className="text-xs text-gray-500">Applied: {app.appliedDate}</p>
      </div>
    </div>

    {/* Middle: Stats */}
    <div className="flex-1 min-w-[300px] grid grid-cols-3 gap-4 px-4 my-2 md:my-0 border-y md:border-y-0 md:border-x border-gray-200 py-2 md:py-0">
      <div>
        <p className="text-xs text-gray-500">Followers</p>
        <p className="text-sm font-bold text-gray-800">{app.followers}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Engagement</p>
        <p className="text-sm font-bold text-gray-800">{app.engagement}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Rate</p>
        <p className="text-sm font-bold text-gray-800">{app.rate}</p>
      </div>
    </div>

    {/* Right Side: Actions */}
    <div className="flex flex-col items-end space-y-2 flex-shrink-0 ml-4">
      <div className="flex items-center space-x-4">
        <StatusTag status={app.status} />
        <div className="flex space-x-3">
          <button className="text-gray-500 hover:text-purple-600">
            <MessageSquare className="w-4 h-4" />
          </button>
          <button className="text-gray-500 hover:text-red-600">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="flex items-center bg-red-600 text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-red-700">
          <X className="w-4 h-4 mr-1" /> Reject
        </button>
        <button className="flex items-center bg-green-600 text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-green-700">
          <Check className="w-4 h-4 mr-1" /> Accept
        </button>
      </div>
    </div>
  </div>
);

// --- Static Data for the Page ---
const applicationsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://placehold.co/48x48/fbcfe8/ffffff?text=SJ&font=inter',
    platformIcon: '📷',
    age: 26,
    campaign: 'Summer Fashion La...',
    appliedDate: 'Jan 18, 2025',
    followers: '545K',
    engagement: '8.2%',
    rate: '$10,000',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Mike Chen',
    avatar: 'https://placehold.co/48x48/a78bfa/ffffff?text=MC&font=inter',
    platformIcon: '▶️',
    age: 28,
    campaign: 'Tech Product Revi...',
    appliedDate: 'Jan 18, 2025',
    followers: '580K',
    engagement: '12.5%',
    rate: '$55,000',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Emma',
    avatar: 'https://placehold.co/48x48/fcd34d/ffffff?text=E&font=inter',
    platformIcon: '📷',
    age: 29,
    campaign: 'Summer Fashion La...',
    appliedDate: 'Jan 18, 2025',
    followers: '1.2M',
    engagement: '15.8%',
    rate: '$80,000',
    status: 'Accepted',
  },
  {
    id: 4,
    name: 'Alex Kumar',
    avatar: 'https://placehold.co/48x48/bbf7d0/ffffff?text=AK&font=inter',
    platformIcon: '📷',
    age: 30,
    campaign: 'Fitness Equipment Pr...',
    appliedDate: 'Jan 18, 2025',
    followers: '325K',
    engagement: '9.1%',
    rate: '$32,000',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Olivia Martinez',
    avatar: 'https://placehold.co/48x48/fecaca/ffffff?text=OM&font=inter',
    platformIcon: '▶️',
    age: 27,
    campaign: 'Tech Product Revi...',
    appliedDate: 'Jan 18, 2025',
    followers: '180K',
    engagement: '11.3%',
    rate: '$22,000',
    status: 'Rejected',
  },
  // Add more data as needed
];


// --- Main Page Component ---
export default function ApplicationsPage() {
  return (
    <>
      <Head>
        <title>Applications Received - Influencer Hub</title>
      </Head>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Applications Received
        </h1>
        <p className="text-gray-500 mt-1">
          Manage influencer applications for your campaigns
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center space-x-3 border-b pb-4 mb-4">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filter by Date</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <FilterDropdown
            label="Time Period"
            options={['All Time', 'Last 30 Days', 'Last 7 Days']}
          />
          {/* This is a placeholder for the other 9 filters */}
          <FilterDropdown
            label="Activity Status"
            options={['All Influencers', 'Active', 'Inactive']}
          />
          <FilterDropdown
            label="Platform"
            options={['All Platforms', 'Instagram', 'YouTube', 'TikTok']}
          />
          <FilterDropdown label="Gender" options={['All', 'Male', 'Female']} />
          <FilterDropdown
            label="Age Range"
            options={['All Ages', '18-24', '25-34']}
          />
          <FilterDropdown
            label="Verification"
            options={['All', 'Verified', 'Not Verified']}
          />
          <FilterDropdown
            label="Engagement Rate"
            options={['Any', '5%+', '10%+']}
          />
          <FilterDropdown
            label="Minimum Followers"
            options={['Any', '10K+', '100K+', '1M+']}
          />
          <FilterDropdown
            label="Application Status"
            options={['All Status', 'Pending', 'Accepted', 'Rejected']}
          />
          {/* We'll add a blank div to fill the 10th spot */}
        </div>
      </div>

      {/* Application List */}
      <div className="space-y-4">
        {applicationsData.map((app) => (
          <ApplicationItem key={app.id} app={app} />
        ))}
      </div>
    </>
  );
}