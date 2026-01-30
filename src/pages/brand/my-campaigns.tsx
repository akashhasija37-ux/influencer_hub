import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
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
  Briefcase,
  Check,
  File,
} from "lucide-react";

/* ============================= */
/* Helpers */
/* ============================= */

const getProgress = (status: string) => {
  if (status === "PUBLISHED") return 65;
  if (status === "DRAFT") return 0;
  return 100;
};

const mapStatus = (status: string) => {
  if (status === "PUBLISHED") return "Active";
  if (status === "DRAFT") return "Draft";
  return "Completed";
};

/* ============================= */
/* UI Components (UNCHANGED) */
/* ============================= */

const StatCard = ({ title, value, icon }: any) => {
  const Icon = icon;
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border flex justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="p-3 bg-purple-100 rounded-lg">
        <Icon className="w-6 h-6 text-purple-600" />
      </div>
    </div>
  );
};

const CampaignStatusTag = ({ status }: { status: string }) => {
  const styles =
    status === "Active"
      ? "bg-green-100 text-green-800"
      : status === "Completed"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-200 text-gray-800";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles}`}>
      {status}
    </span>
  );
};

const CampaignCard = ({ campaign }: any) => (
  <div className="bg-white rounded-lg shadow-sm border">
    <div className="flex justify-between p-5 border-b">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">{campaign.title}</h2>
        <CampaignStatusTag status={campaign.status} />
        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
          {campaign.category}
        </span>
      </div>
      <MoreHorizontal className="w-5 h-5 text-gray-400" />
    </div>

    <div className="p-5">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm">
          <span>Campaign Progress</span>
          <span className="font-bold">{campaign.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 h-2.5 rounded-full">
          <div
            className="bg-purple-600 h-2.5 rounded-full"
            style={{ width: `${campaign.progress}%` }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-5 gap-4 py-4 border-y text-sm">
        <div>
          <p className="text-gray-500">Platform</p>
          <p className="font-semibold">{campaign.platform}</p>
        </div>
        <div>
          <p className="text-gray-500">Budget</p>
          <p className="font-semibold">{campaign.budget}</p>
        </div>
        <div>
          <p className="text-gray-500">Deadline</p>
          <p className="font-semibold">{campaign.deadline}</p>
        </div>
        <div>
          <p className="text-gray-500">Applications</p>
          <p className="font-semibold">{campaign.applications}</p>
        </div>
        <div>
          <p className="text-gray-500">Accepted</p>
          <p className="font-semibold">{campaign.accepted}</p>
        </div>
      </div>

      {/* Analytics */}
      <div className="flex gap-6 pt-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Engagement</p>
            <p className="font-bold">{campaign.engagement}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <BarChart className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Reach</p>
            <p className="font-bold">{campaign.reach}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-end gap-3 p-5 bg-gray-50 border-t">
      <button className="btn">View</button>
      <button className="btn">Edit</button>
      <button className="btn text-red-600">Delete</button>
    </div>
  </div>
);

/* ============================= */
/* Page */
/* ============================= */

export default function MyCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/campaigns/my", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        const mapped = data.campaigns.map((c: any) => ({
          title: c.title,
          status: mapStatus(c.status),
          category: c.niche,
          progress: getProgress(c.status),
          platform: c.platforms,
          budget: c.budgetRange,
          deadline: new Date(c.deadline).toLocaleDateString(),
          applications: c.applications.length,
          accepted: c.applications.filter(
            (a: any) => a.status === "ACCEPTED"
          ).length,
          engagement: "—",
          reach: "—",
        }));
        setCampaigns(mapped);
        setLoading(false);
      });
  }, []);

  const stats = useMemo(() => {
    return {
      total: campaigns.length,
      active: campaigns.filter(c => c.status === "Active").length,
      completed: campaigns.filter(c => c.status === "Completed").length,
      draft: campaigns.filter(c => c.status === "Draft").length,
    };
  }, [campaigns]);

  return (
    <>
      <Head>
        <title>My Campaigns</title>
      </Head>

      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Campaigns</h1>
          <p className="text-gray-500">
            Manage and track all your influencer campaigns
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Campaigns" value={stats.total} icon={Briefcase} />
        <StatCard title="Active" value={stats.active} icon={Check} />
        <StatCard title="Completed" value={stats.completed} icon={CheckCircle} />
        <StatCard title="Drafts" value={stats.draft} icon={File} />
      </div>

      {/* Campaigns */}
      <div className="space-y-6">
        {loading ? (
          <p>Loading campaigns...</p>
        ) : (
          campaigns.map((c, i) => <CampaignCard key={i} campaign={c} />)
        )}
      </div>
    </>
  );
}
