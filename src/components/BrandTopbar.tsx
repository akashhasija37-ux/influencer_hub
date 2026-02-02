import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Bell,
  MessageSquare,
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";

export default function BrandTopbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user"); // optional
    navigate.push("/login");
  };

  return (
    <header className="flex items-center justify-end h-16 bg-white border-b border-gray-200 px-6">
      <div className="flex items-center space-x-6">
        {/* Chat */}
        <button className="text-gray-600 hover:text-purple-600">
          <MessageSquare className="w-6 h-6" />
        </button>

        {/* Notifications */}
        <button className="text-gray-600 hover:text-purple-600">
          <Bell className="w-6 h-6" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
              <button
                onClick={() => {
                  navigate.push("/brand/profile");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50"
              >
                <User className="w-4 h-4" />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
