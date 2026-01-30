import Head from "next/head";
import { useEffect, useState } from "react";
import { Download, MoreHorizontal } from "lucide-react";
import CampaignChart from "@/components/CampaignChart";
import RevenueChart from "@/components/RevenueChart";

type Campaign = {
  id: string;
  name: string;
  brand: string;
  applications: number;
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/campaigns", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCampaigns(data))
      .finally(() => setLoading(false));
  }, []);

  const maxApplications = Math.max(
    ...campaigns.map((c) => c.applications),
    1
  );

  return (
    <>
      <Head>
        <title>Campaign Management - Influencer Hub</title>
      </Head>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Campaign Management
          </h1>
          <p className="text-gray-500 mt-1">
            Track all platform campaigns
          </p>
        </div>
        <button className="flex items-center bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Campaigns Posted (Monthly)
          </h2>
          <div className="h-80">
            <CampaignChart />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Applications Received
          </h2>
          <div className="h-80">
            <RevenueChart />
          </div>
        </div>
      </div>

      {/* Top Campaigns */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Top Campaigns by Applications
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading campaigns...</p>
        ) : (
          <ul className="space-y-6">
            {campaigns.map((campaign, index) => {
              const width =
                (campaign.applications / maxApplications) * 100;

              return (
                <li key={campaign.id}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-gray-500 mr-3">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {campaign.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {campaign.brand}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-purple-600 mr-4">
                        {campaign.applications} applications
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
