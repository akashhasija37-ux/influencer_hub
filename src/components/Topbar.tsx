import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Search, Bell, LogOut, Settings, ChevronDown } from "lucide-react";

type AuthUser = {
  id: string;
  email: string;
  role: "ADMIN" | "BRAND" | "INFLUENCER";
  name?: string;
};

export default function Topbar() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [open, setOpen] = useState(false);

  // 🔐 Fetch logged-in user
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || user?.role?.[0] || "U";

  return (
    <header className="flex items-center justify-between h-16 bg-white border-b px-6">
      {/* Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="search"
            placeholder="Search brands, influencers, campaigns..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-5">
        {/* Notifications */}
        <button className="relative text-gray-600 hover:text-gray-800">
          <Bell className="w-6 h-6" />
        </button>

        {/* Profile */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-2"
            >
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                {initials}
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-700">
                {user.name || user.role}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <div className="px-4 py-2 text-xs text-gray-500 border-b">
                  {user.email}
                </div>

                <button
                  onClick={() => router.push("/admin/settings")}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Profile Settings
                </button>

                <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
