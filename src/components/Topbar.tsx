// src/components/Topbar.tsx
import { Search, Bell } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="flex items-center justify-between h-16 bg-white border-b px-6">
      
      {/* Search Bar */}
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
      
      {/* Right Side: Icons & User */}
      <div className="flex items-center space-x-5">
        <button
          className="relative text-gray-600 hover:text-gray-800"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
          {/* You can add a notification dot here later */}
          {/* <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span> */}
        </button>
        
        {/* User Profile Dropdown */}
        <div className="relative">
          <button className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
              AD
            </div>
            <span className="hidden md:inline text-sm font-medium text-gray-700">Admin</span>
            {/* <ChevronDown className="w-4 h-4 text-gray-500" /> */}
          </button>
          
          {/* Dropdown menu would go here. For a static build,
            we can leave it out. We would add it later with a library
            like Radix UI or Headless UI.
          */}
        </div>
      </div>
    </header>
  );
}