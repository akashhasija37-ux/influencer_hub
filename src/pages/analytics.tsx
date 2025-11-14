import Head from 'next/head';
import { Download, ChevronDown, TrendingUp, Target, Zap } from 'lucide-react';
import RevenueChart from '@/components/RevenueChart'; // Reusing our chart

export default function AnalyticsPage() {
  return (
    <>
      <Head>
        <title>Analytics & Reports - Influencer Hub</title>
      </Head>

      {/* Header and Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Analytics & Reports
          </h1>
          <p className="text-gray-500 mt-1">
            Platform insights and performance metrics
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center bg-white border rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Last 30 Days
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          <button className="flex items-center bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </button>
        </div>
      </div>

      {/* Main Revenue Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Platform Revenue Trend
        </h2>
        {/* We give this chart more height since it's the main one */}
        <div className="h-96">
          <RevenueChart />
        </div>
      </div>

      {/* AI-Powered Insights */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          AI-Powered Insights
        </h2>
        <div className="space-y-6">
          {/* Insight 1 */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-900">
                Top 5 Influencers Gaining Traction
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Sarah Johnson, Mike Chen, Emily Rodriguez have seen 30%+
                follower growth this week.
              </p>
            </div>
          </div>

          {/* Insight 2 */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-900">
                Brands with Highest Campaign Engagement
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                FitLife Nutrition and GreenEarth Cosmetics campaigns are
                performing 45% above average.
              </p>
            </div>
          </div>

          {/* Insight 3 */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-full">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-900">
                Peak Activity Hours
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Most applications are submitted between 2-5 PM EST on
                weekdays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
