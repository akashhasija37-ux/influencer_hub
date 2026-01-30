import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  User,
  Megaphone,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-black text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-10">Influencer Hub</h2>

      <nav className="flex-1 space-y-4">
        <NavItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <NavItem href="/profile" icon={User} label="Profile" />
        <NavItem href="/campaigns" icon={Megaphone} label="Campaigns" />
        <NavItem href="/my-applications" icon={FileText} label="Applications" />
        <NavItem href="/settings" icon={Settings} label="Settings" />
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 text-red-400 hover:text-red-300"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-gray-300 hover:text-white"
    >
      <Icon className="w-5 h-5" />
      {label}
    </Link>
  );
}
