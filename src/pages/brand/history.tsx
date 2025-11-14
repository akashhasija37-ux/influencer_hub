import Head from 'next/head';
import React from 'react';
import {
  FileText,
  Target,
  MessageSquare,
  Bell,
  Link2,
  Plus,
  Edit,
  CheckCircle,
  Trash2,
  XCircle,
  UserPlus,
  TrendingUp,
  Settings,
  AlertTriangle,
  Clock,
} from 'lucide-react';

// --- Internal Component: StatCard ---
const StatCard = ({ title, value, color }: { title: string, value: string, color: string }) => (
  <div className={`bg-white p-5 rounded-lg shadow-sm border-l-4 ${color}`}>
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="text-4xl font-bold text-gray-800">{value}</p>
  </div>
);

// --- Internal Component: TimelineItem ---
const TimelineItem = ({ item }: { item: any }) => {
  const Icon = item.icon;
  return (
    <div className="flex space-x-4">
      {/* Icon and Vertical Line */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.iconBg}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 w-0.5 bg-gray-200 my-2"></div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-md font-semibold text-gray-800">{item.title}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.categoryBg} ${item.categoryColor}`}>
                {item.category}
              </span>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
          <span className="text-sm text-gray-500">{item.time}</span>
        </div>
      </div>
    </div>
  );
};

// --- Static Data for the Page ---
const statsData = [
  { title: 'Total Activities', value: '20', color: 'border-purple-500' },
  { title: 'Campaigns', value: '4', color: 'border-blue-500' },
  { title: 'Messages', value: '2', color: 'border-green-500' },
  { title: 'Notifications', value: '8', color: 'border-yellow-500' },
  { title: 'Social Links', value: '2', color: 'border-red-500' },
];

const timelineData = [
  {
    icon: Plus,
    iconBg: 'bg-green-500',
    title: 'Created Campaign',
    category: 'Campaign',
    categoryBg: 'bg-green-100',
    categoryColor: 'text-green-800',
    description: 'Summer Fashion Launch',
    time: '2025-01-18 10:30 AM',
  },
  {
    icon: MessageSquare,
    iconBg: 'bg-blue-500',
    title: 'Conversation with Sarah Johnson',
    category: 'Message',
    categoryBg: 'bg-blue-100',
    categoryColor: 'text-blue-800',
    description: 'Discussing deliverables for Summer Launch',
    time: '2025-01-18 09:45 AM',
  },
  {
    icon: Edit,
    iconBg: 'bg-purple-500',
    title: 'Updated Campaign',
    category: 'Campaign',
    categoryBg: 'bg-green-100',
    categoryColor: 'text-green-800',
    description: 'Tech Product Review, changed budget to $150,000',
    time: '2025-01-17 04:20 PM',
  },
  {
    icon: Link2,
    iconBg: 'bg-red-500',
    title: 'Connected Instagram',
    category: 'Social Media',
    categoryBg: 'bg-red-100',
    categoryColor: 'text-red-800',
    description: 'Successfully linked @brandfit account',
    time: '2025-01-17 02:15 PM',
  },
  {
    icon: CheckCircle,
    iconBg: 'bg-green-500',
    title: 'Accepted Application',
    category: 'Application',
    categoryBg: 'bg-yellow-100',
    categoryColor: 'text-yellow-800',
    description: 'Emma Davis for Summer Fashion Launch',
    time: '2025-01-16 11:30 AM',
  },
  {
    icon: MessageSquare,
    iconBg: 'bg-blue-500',
    title: 'Conversation with Mike Chen',
    category: 'Message',
    categoryBg: 'bg-blue-100',
    categoryColor: 'text-blue-800',
    description: 'Sent campaign brief and deliverables',
    time: '2025-01-16 10:00 AM',
  },
  {
    icon: Trash2,
    iconBg: 'bg-red-500',
    title: 'Removed Campaign',
    category: 'Campaign',
    categoryBg: 'bg-green-100',
    categoryColor: 'text-green-800',
    description: 'Deleted Winter Collection Campaign',
    time: '2025-01-15 03:45 PM',
  },
  {
    icon: XCircle,
    iconBg: 'bg-red-500',
    title: 'Rejected Application',
    category: 'Application',
    categoryBg: 'bg-yellow-100',
    categoryColor: 'text-yellow-800',
    description: 'Olivia Martinez for Travel Accessories Launch',
    time: '2025-01-15 01:20 PM',
  },
  {
    icon: Link2,
    iconBg: 'bg-gray-500',
    title: 'Disconnected Facebook',
    category: 'Social Media',
    categoryBg: 'bg-red-100',
    categoryColor: 'text-red-800',
    description: '@brandfit account disconnected',
    time: '2025-01-14 05:00 PM',
  },
  {
    icon: TrendingUp,
    iconBg: 'bg-purple-500',
    title: 'Subscription Updated',
    category: 'Subscription',
    categoryBg: 'bg-purple-100',
    categoryColor: 'text-purple-800',
    description: 'Changed from Basic to Pro Plan',
    time: '2025-01-14 12:30 PM',
  },
  // Add the rest of the items here...
];


// --- Main Page Component ---
export default function ActivityHistoryPage() {
  return (
    <>
      <Head>
        <title>Activity History - Influencer Hub</title>
      </Head>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Activity History</h1>
        <p className="text-gray-500 mt-1">
          A complete timeline of all your activities and changes
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statsData.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>

      {/* Timeline Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Complete Activity Timeline
        </h2>
        <div className="relative">
          {/* This is the base vertical line */}
          <div className="absolute left-5 top-0 w-0.5 h-full bg-gray-200 -z-1"></div>
          
          <div className="space-y-0">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}