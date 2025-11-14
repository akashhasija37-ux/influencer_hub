import { Bell, MessageSquare, User, ChevronDown } from 'lucide-react';

export default function BrandTopbar() {
  return (
    <header className="flex items-center justify-end h-16 bg-white border-b border-gray-200 px-6">
      {/* Right Side: Icons & User */}
      <div className="flex items-center space-x-6">
        <button
          className="relative text-gray-600 hover:text-purple-600"
          aria-label="Chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
        <button
          className="relative text-gray-600 hover:text-purple-600"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">
              <User className="w-5 h-5" />
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}