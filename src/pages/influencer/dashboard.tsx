import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  Megaphone,
  ClipboardList,
  User,
  LogOut,
  Menu,
} from "lucide-react";

/* ================= TYPES ================= */

type Campaign = {
  id: string;
  title: string;
  brand: { name: string };
  platform: "INSTAGRAM" | "YOUTUBE" | "TIKTOK";
  deadline: string;
  minFollowers: number;
  minEngagement: number;
  deliverables: string;
};

type Application = {
  id: string;
  campaign: string;
  status: string;
};

type InfluencerProfile = {
  platform: string;
  username: string;
  followers: number;
  mediaCount: number;
  engagementRate: number;
};

/* ================= PAGE ================= */

export default function InfluencerDashboard() {
  const router = useRouter();

  const [tab, setTab] = useState<
    "DASHBOARD" | "CAMPAIGNS" | "APPLICATIONS" | "PROFILE"
  >("DASHBOARD");

  const [collapsed, setCollapsed] = useState(false);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [profile, setProfile] = useState<InfluencerProfile | null>(null);

  const [selected, setSelected] = useState<Campaign | null>(null);
  const [step, setStep] = useState<"DETAILS" | "CONNECT">("DETAILS");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    fetch("/api/influencers/campaigns", { credentials: "include" })
      .then(res => res.json())
      .then(setCampaigns);

    fetch("/api/influencers/applications", { credentials: "include" })
      .then(res => res.json())
      .then(setApplications);

    fetch("/api/influencers/profile", { credentials: "include" })
      .then(res => res.json())
      .then(setProfile);
  }, []);

  /* ================= ACTIONS ================= */

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  const applyCampaign = async () => {
    if (!username) return alert("Enter username");

    setLoading(true);

    const res = await fetch("/api/influencers/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        campaignId: selected?.id,
        platform: selected?.platform,
        username,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to apply");
      return;
    }

    alert("Applied successfully");
    setSelected(null);
    setUsername("");
    setStep("DETAILS");

    fetch("/api/influencers/applications", { credentials: "include" })
      .then(res => res.json())
      .then(setApplications);

    fetch("/api/influencers/profile", { credentials: "include" })
      .then(res => res.json())
      .then(setProfile);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      {/* SIDEBAR */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-gray-900 border-r border-gray-800 p-4 flex flex-col transition-all`}
      >
        <div className="text-purple-500 font-bold text-xl mb-8">
          {!collapsed && "Influencer Hub"}
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active={tab === "DASHBOARD"}
            collapsed={collapsed}
            onClick={() => setTab("DASHBOARD")}
          />
          <SidebarItem
            icon={<Megaphone size={18} />}
            label="Campaigns"
            active={tab === "CAMPAIGNS"}
            collapsed={collapsed}
            onClick={() => setTab("CAMPAIGNS")}
          />
          <SidebarItem
            icon={<ClipboardList size={18} />}
            label="Applications"
            active={tab === "APPLICATIONS"}
            collapsed={collapsed}
            onClick={() => setTab("APPLICATIONS")}
          />
          <SidebarItem
            icon={<User size={18} />}
            label="Profile"
            active={tab === "PROFILE"}
            collapsed={collapsed}
            onClick={() => setTab("PROFILE")}
          />
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-400 hover:text-red-500 mt-6"
        >
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </button>
      </aside>

      {/* MAIN */}
      <div className="flex-1">
        {/* HEADER */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold">
              {profile?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <button
              onClick={logout}
              className="text-sm text-gray-300 hover:text-red-400"
            >
              Logout
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-8">
          {/* DASHBOARD */}
          {tab === "DASHBOARD" && (
            <>
              <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Campaigns" value={campaigns.length} />
                <StatCard
                  label="Applied Campaigns"
                  value={applications.length}
                />
                <StatCard
                  label="Followers"
                  value={profile?.followers || 0}
                />
                <StatCard
                  label="Engagement %"
                  value={profile?.engagementRate || 0}
                />
              </div>

              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h2 className="font-semibold mb-4">
                  Weekly Engagement Overview
                </h2>
                <div className="flex gap-3 items-end h-32">
                  {[40, 60, 50, 80, 65, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="bg-purple-600 rounded w-8"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* CAMPAIGNS */}
          {tab === "CAMPAIGNS" && (
            <>
              <h1 className="text-3xl font-bold mb-6">Active Campaigns</h1>
              <div className="grid md:grid-cols-3 gap-6">
                {campaigns.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelected(c);
                      setStep("DETAILS");
                    }}
                    className="bg-gray-900 p-6 rounded-xl border border-gray-800 cursor-pointer hover:border-purple-600"
                  >
                    <h3 className="font-semibold">{c.title}</h3>
                    <p className="text-sm text-gray-400">{c.brand.name}</p>
                    <div className="flex justify-between mt-3 text-sm">
                      <span className="text-purple-400">{c?.platform}</span>
                      <span>{formatDate(c.deadline)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* APPLICATIONS */}
          {tab === "APPLICATIONS" && (
            <>
              <h1 className="text-3xl font-bold mb-6">Applications</h1>
              <div className="space-y-4">
                {applications.map(a => (
                  <div
                    key={a.id}
                    className="bg-gray-900 p-4 rounded-lg border border-gray-800"
                  >
                    <h3 className="font-semibold">{a.campaign}</h3>
                    <p className="text-sm text-gray-400">
                      Status: {a.status}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* PROFILE */}
          {tab === "PROFILE" && profile && (
            <>
              <h1 className="text-3xl font-bold mb-6">Profile</h1>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-2">
                <p>Platform: {profile.platform}</p>
                <p>Username: {profile.username}</p>
                <p>Followers: {profile.followers}</p>
                <p>Posts: {profile.mediaCount}</p>
                <p>Engagement: {profile.engagementRate}%</p>
              </div>
            </>
          )}
        </main>
      </div>

      {/* APPLY MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 w-full max-w-lg rounded-xl p-6 border border-gray-800">
            {step === "DETAILS" && (
              <>
                <h2 className="text-xl font-bold">{selected.title}</h2>
                <p className="text-gray-400 mb-4">{selected.brand.name}</p>

                <p>Min Followers: {selected.minFollowers}</p>
                <p>Min Engagement: {selected.minEngagement}%</p>

                <p className="mt-3 text-sm text-gray-400">
                  {selected.deliverables}
                </p>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setSelected(null)}
                    className="flex-1 bg-gray-800 py-2 rounded-lg"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setStep("CONNECT")}
                    className="flex-1 bg-purple-600 py-2 rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </>
            )}

            {step === "CONNECT" && (
              <>
                <h2 className="text-xl font-bold mb-4">
                  Connect {selected.platform}
                </h2>

                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-black border border-gray-700 p-3 rounded-lg mb-4"
                  placeholder="Enter username"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("DETAILS")}
                    className="flex-1 bg-gray-800 py-2 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={applyCampaign}
                    disabled={loading}
                    className="flex-1 bg-purple-600 py-2 rounded-lg"
                  >
                    {loading ? "Applying..." : "Connect & Apply"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SidebarItem({
  icon,
  label,
  active,
  collapsed,
  onClick,
}: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg ${
        active ? "bg-purple-600" : "hover:bg-gray-800"
      }`}
    >
      {icon}
      {!collapsed && label}
    </button>
  );
}

function StatCard({ label, value }: any) {
  return (
    <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
