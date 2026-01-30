import { ReactNode } from "react";
import InfluenceSidebar from '@/components/InfluenceSidebar'

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <InfluenceSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
       

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
