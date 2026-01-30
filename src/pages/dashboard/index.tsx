import Head from "next/head";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  Users,
  Activity,
  CheckCircle,
  Link2,
} from "lucide-react";

interface DashboardData {
  username: string;
  platform: string;
  followers: number;
  connected: boolean;
  totalApplications: number;
  approvedApplications: number;
}

export default function InfluencerDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/influencer/dashboard")
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="p-10 text-red-500">Failed to load data</div>;
  }

  return (
    <>
      <Head>
        <title>Influencer Dashboard</title>
      </Head>

      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">
            Welcome, {data.username}
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Followers"
              value={data.followers}
              icon={Users}
            />
            <StatCard
              title="Applications"
              value={data.totalApplications}
              icon={Activity}
            />
            <StatCard
              title="Approved"
              value={data.approvedApplications}
              icon={CheckCircle}
            />
            <StatCard
              title="Platform"
              value={data.platform.toUpperCase()}
              icon={Link2}
            />
          </div>

          {/* Account Status */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">
              Account Status
            </h2>

            {data.connected ? (
              <p className="text-green-600">
                ✅ Connected to {data.platform}
              </p>
            ) : (
              <p className="text-red-500">
                ❌ Platform not connected. Connect before applying to campaigns.
              </p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: any;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
      <div className="p-3 rounded-full bg-purple-100">
        <Icon className="w-6 h-6 text-purple-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
