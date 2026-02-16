import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Target, Sun, Moon, User, LogOut } from "lucide-react";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "BRAND" | "INFLUENCER";
};

type HeaderProps = {
  onNavigate?: (key: string) => void; // ✅ OPTIONAL NOW
};

export default function Header({ onNavigate }: HeaderProps) {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [open, setOpen] = useState(false);

  /* ================= THEME ================= */

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  /* ================= AUTH ================= */

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(res => (res.ok ? res.json() : { user: null }))
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, [router.asPath]);

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    router.push("/login");
  };

  /* ================= NAVIGATION ================= */

  const navItems = [
    { label: "About Us", route: "/about-us" },
    { label: "Followers Check", route: "/fake-followers-checker" },
    { label: "For Creators", route: "/for-creators" },
    { label: "For Brands", route: "/for-brands" },
    { label: "Blogs", route: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">

        {/* LOGO */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Target className="w-6 h-6 text-purple-600" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            InfluenceHub
          </span>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => router.push(item.route)}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-4">

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition
                       text-gray-700 dark:text-purple-400
                       hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* AUTH UI */}
          {!user ? (
            <>
              <button
                onClick={() => router.push("/login")}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/register")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition"
              >
                Get Started
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  {user.name}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg w-44 shadow-lg">
                  <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
                    {user.role}
                  </div>

                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/settings");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
