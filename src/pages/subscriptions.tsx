import Head from 'next/head';
import { Download, ChevronDown, MoreHorizontal } from 'lucide-react';

// This is new static data for this page
const subscriptionsData = [
  {
    name: 'Sarah Johnson',
    email: '@sarah_johnson',
    avatarInitial: 'SJ',
    plan: 'Premium',
    status: 'Active',
    amount: 99,
    renewalDate: 'Nov 30, 2025',
  },
  {
    name: 'TechGear Pro',
    email: 'billing@techgear.pro',
    avatarInitial: 'TP',
    plan: 'Pro',
    status: 'Active',
    amount: 299,
    renewalDate: 'Nov 28, 2025',
  },
  {
    name: 'Mike Chen',
    email: '@mikechen',
    avatarInitial: 'MC',
    plan: 'Free',
    status: 'Active',
    amount: 0,
    renewalDate: 'N/A',
  },
  {
    name: 'Urban Fashion Co',
    email: 'accounts@urbanfashion.co',
    avatarInitial: 'UFC',
    plan: 'Pro',
    status: 'Active',
    amount: 299,
    renewalDate: 'Nov 15, 2025',
  },
  {
    name: 'Anna Lee',
    email: '@anna_lee',
    avatarInitial: 'AL',
    plan: 'Canceled',
    status: 'Canceled',
    amount: 99,
    renewalDate: 'Oct 22, 2025',
  },
];

// Helper component for the Plan tag
const PlanTag = ({ plan }: { plan: string }) => {
  let styles = 'bg-gray-100 text-gray-800';
  if (plan === 'Premium') styles = 'bg-yellow-100 text-yellow-800';
  if (plan === 'Pro') styles = 'bg-purple-100 text-purple-800';
  if (plan === 'Canceled') styles = 'bg-red-100 text-red-800';
  
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>{plan}</span>;
};

// Helper component for the Status tag
const StatusTag = ({ status }: { status: string }) => {
  let styles = 'bg-green-100 text-green-800';
  if (status === 'Canceled') styles = 'bg-red-100 text-red-800';
  
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>{status}</span>;
};


export default function SubscriptionsPage() {
  return (
    <>
      <Head>
        <title>Subscription Management - Influencer Hub</title>
      </Head>

      {/* Header and Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Subscription Management
          </h1>
          <p className="text-gray-500 mt-1">
            Track and manage all user subscriptions
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center bg-white border rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Filter by Plan
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          <button className="flex items-center bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Renewal Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscriptionsData.map((sub) => (
                <tr key={sub.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                          {sub.avatarInitial}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {sub.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {sub.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PlanTag plan={sub.plan} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusTag status={sub.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    ${sub.amount}{sub.plan !== 'Free' && sub.plan !== 'Canceled' ? '/mo' : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sub.renewalDate}
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
