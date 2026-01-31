import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Download,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

/* ================= TYPES ================= */

type Influencer = {
  id: number;
  username: string;
  avatarInitial: string;
  platform: string;
  followers: string;
  engagement: number;
  lastActive: string;
  campaigns: number;
  profileViews: number;
};

/* ================= PLATFORM TAG ================= */

const PlatformTag = ({ platform }: { platform: string }) => {
  let bg = "bg-gray-100";
  let text = "text-gray-800";

  if (platform === "Instagram") {
    bg = "bg-pink-100";
    text = "text-pink-800";
  } else if (platform === "YouTube") {
    bg = "bg-red-100";
    text = "text-red-800";
  } else if (platform === "TikTok") {
    bg = "bg-blue-100";
    text = "text-blue-800";
  }

  return (
    <span className={`${bg} ${text} px-3 py-1 rounded-full text-xs font-medium`}>
      {platform}
    </span>
  );
};

/* ================= PAGE ================= */

export default function InfluencersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/influencers", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setInfluencers(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  console.log(influencers)

  if (loading) {
    return (
      <div className="p-6 text-gray-500 text-sm">
        Loading influencers...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Influencer Management - Influencer Hub</title>
      </Head>

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Influencer Management
          </h1>
          <p className="text-gray-500 mt-1">
            Monitor and manage influencer accounts
          </p>
        </div>

        <div className="flex space-x-3">
          <button className="flex items-center bg-white border rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            All Platforms
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>

          <button className="flex items-center bg-white border rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Last 30 Days
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>

          <button className="flex items-center bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Influencer",
                  "Platform",
                  "Followers",
                  "Engagement",
                  "Last Active",
                  "Campaigns",
                  "Profile Views",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
             
              {influencers.map((inf) => (
                <tr key={inf.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                        {inf.avatarInitial}
                      </div>
                      <div className="ml-4 text-sm font-medium text-gray-900">
                        {inf.username}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <PlatformTag platform={inf.platform} />
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    {inf.followers}
                  </td>

                  <td className="px-6 py-4 text-sm text-green-600 font-medium">
                    {inf.engagement}%
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {inf.lastActive}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    {inf.campaigns}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    {inf.profileViews}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </td>
                </tr>
              ))}

              {influencers.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No influencers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
