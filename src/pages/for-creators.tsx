import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from 'react';
import { Users, Briefcase, DollarSign, ShieldCheck, ArrowRight,Search,
  ChevronDown,
  Globe,
  Heart,
  Target,
  BarChart,
  Code,
  Film,
  MessageSquare,
  Lock,
  Sun,
  Moon,
  Zap,
  PlusSquare,
  TrendingUp,
  Instagram,
   User, LogOut, } from "lucide-react";

export default function ForCreatorsPage() {
type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "BRAND" | "INFLUENCER";
};
const Header = ({ onNavigate }: { onNavigate: (key: string) => void }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // 🔐 Check auth state (homepage-safe)


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



 useEffect(() => {
  fetch("/api/auth/me", {
    credentials: "include",
  })
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

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Target className="w-6 h-6 text-purple-500" />
          <span className="text-xl font-bold">InfluenceHub</span>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          {[
  { label: "About Us", key: "about-us", route:'/about-us' },
  { label: "Followers Check", key: "fake-followers-check", route:'/fake-followers-check' },
  { label: "Search Influencer", key: "for-creators", route: "/for-creators" },
  { label: "Brand Jobs", key: "brand-jobs", route: "/brands-job" },
  { label: "Blogs", key: "blog", route:'/blog' },
].map(item => (
  <button
    key={item.key}
    onClick={() => {
      if (item.route) {
        router.push(item.route);
      } else {
        onNavigate(item.key);
      }
    }}
    className="hover:text-purple-400 transition"
  >
    {item.label}
  </button>
))}

        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode */}
    <button
  className="p-2 rounded-full transition 
             text-gray-700 dark:text-purple-400 
             hover:bg-gray-200 dark:hover:bg-gray-800"
  onClick={toggleTheme}
>
  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
</button>

          {/* AUTH UI */}
          {!user ? (
  <>
    <button
      onClick={() => router.push("/login")}
      className="text-sm font-medium hover:text-purple-400 transition"
    >
      Login
    </button>
    <button
      onClick={() => router.push("/register")}
      className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
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
      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
        <User size={16} />
      </div>
      <span className="text-sm">{user.name}</span>
    </button>

    {open && (
      <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg w-44 z-50">
        <div className="px-4 py-2 text-xs text-gray-400">
          {user.role}
        </div>

        <button
          onClick={() => {
            setOpen(false);
            router.push("/settings");
          }}
          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
        >
          Profile
        </button>

        <button
          onClick={() => {
            setOpen(false);
            logout();
          }}
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
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
};

  return (
    <>
      <Head>
        <title>
          Influencer Jobs & Brand Deals - Get Sponsored Today
        </title>
        <meta
          name="description"
          content="Find influencer jobs, get brand deals, and unlock sponsorship opportunities. Connect with brands, monetize your content, and grow your creator income."
        />
        <link rel="canonical" href="https://yourdomain.com/for-creators" />
      </Head>

      <div className="min-h-screen bg-black text-white">
<Header />
        {/* HERO */}
        <section className="py-24 bg-gradient-to-b from-[#0b1220] to-black text-center">
          <div className="max-w-5xl mx-auto px-6">

            <div className="inline-flex items-center bg-purple-900/40 text-purple-400 border border-purple-700 px-4 py-1 rounded-full text-sm mb-6">
              <ShieldCheck className="w-4 h-4 mr-2" />
              50,000+ Creators Earning on Platform
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Turn Your Audience Into Income Connect With Brands Today
            </h1>

            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">
              Access exclusive influencer sponsorship opportunities, get paid
              brand deals, and discover collaborations that match your niche.
              Start earning in 24 hours.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/register"
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold flex items-center"
              >
                Get Brand Deals
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <Link
                href="/login"
                className="border border-gray-700 px-8 py-3 rounded-lg hover:bg-gray-800"
              >
                Creator Login
              </Link>
            </div>
          </div>
        </section>

        {/* METRICS BAR */}
        <section className="py-12 border-t border-gray-800 bg-[#0b1220]">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
            {[
              "50,000+ Creators",
              "5,000+ Verified Brands",
              "$250M+ Paid Annually",
              "50,000+ Active Deals"
            ].map((item, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-purple-400">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="py-20 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Why Most Creators Don't Get Paid What They're Worth
          </h2>

          <div className="grid md:grid-cols-2 gap-10 text-gray-400">
            <ul className="space-y-3">
              <li>✗ Algorithm uncertainty</li>
              <li>✗ Low CPM rates</li>
              <li>✗ No brand outreach</li>
              <li>✗ Unfair negotiations</li>
              <li>✗ Payment delays</li>
            </ul>

            <p>
              Only 8–10% of creators monetize effectively. Our influencer jobs
              platform connects you directly with verified brands offering
              sponsorship opportunities and influencer collaborations.
            </p>
          </div>
        </section>

        {/* MONETIZATION METHODS */}
        <section className="py-20 bg-[#0b1220] border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-3xl font-bold text-center mb-12">
              Multiple Ways to Monetize
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-black border border-gray-800 p-6 rounded-xl hover:border-purple-600 transition">
                <Briefcase className="text-purple-500 mb-4" />
                <h3 className="font-semibold text-xl mb-3">
                  Sponsored Posts
                </h3>
                <p className="text-gray-400 text-sm">
                  Earn ₹500–₹500,000 per post depending on follower size.
                </p>
              </div>

              <div className="bg-black border border-gray-800 p-6 rounded-xl hover:border-purple-600 transition">
                <DollarSign className="text-purple-500 mb-4" />
                <h3 className="font-semibold text-xl mb-3">
                  Affiliate Deals
                </h3>
                <p className="text-gray-400 text-sm">
                  Earn 10–30% commission per sale. Unlimited earning potential.
                </p>
              </div>

              <div className="bg-black border border-gray-800 p-6 rounded-xl hover:border-purple-600 transition">
                <Users className="text-purple-500 mb-4" />
                <h3 className="font-semibold text-xl mb-3">
                  Brand Ambassador Roles
                </h3>
                <p className="text-gray-400 text-sm">
                  Monthly retainers and long-term sponsorship contracts.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">

            <div className="border border-gray-800 rounded-xl p-6 bg-[#0b1220]">
              <h3 className="font-semibold mb-2">
                How do I find influencer jobs?
              </h3>
              <p className="text-gray-400 text-sm">
                Create your creator profile and browse verified brand deals.
                Most creators receive their first deal within 1–2 weeks.
              </p>
            </div>

            <div className="border border-gray-800 rounded-xl p-6 bg-[#0b1220]">
              <h3 className="font-semibold mb-2">
                How much can micro-influencers earn?
              </h3>
              <p className="text-gray-400 text-sm">
                ₹2,000–₹10,000 per post. Combined with affiliate deals,
                many earn ₹50K+ monthly.
              </p>
            </div>

            <div className="border border-gray-800 rounded-xl p-6 bg-[#0b1220]">
              <h3 className="font-semibold mb-2">
                When do I get paid?
              </h3>
              <p className="text-gray-400 text-sm">
                Payments are released within 5 days after content approval.
              </p>
            </div>

          </div>
        </section>
        <footer className="bg-black py-16 border-t border-gray-800">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8">
                                {/* Logo & Description */}
                                <div className="col-span-2 md:col-span-2">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Target className="w-6 h-6 text-purple-500" />
                                        <span className="text-xl font-bold text-white">InfluenceHub</span>
                                    </div>
                                    <p className="text-sm text-gray-400 max-w-sm">
                                        Discover influencers that drive real results. Connect with creators who match your brand goals.
                                    </p>
                                    <div className="flex space-x-4 mt-6">
                                        {[MessageSquare, Globe, Heart, Instagram].map((Icon, index) => (
                                            <a key={index} href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-purple-400 transition">
                                                <Icon className="w-5 h-5" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                
                                {/* Product Links */}
                                <div>
                                    <h5 className="text-md font-bold text-white mb-4">Product</h5>
                                    <ul className="space-y-3 text-sm text-gray-400">
                                        {['Search Influencers', 'About', 'Analytics', 'Campaigns'].map(item => (
                                            <li key={item}><a href="#" className="hover:text-purple-400">{item}</a></li>
                                        ))}
                                    </ul>
                                </div>
                
                                {/* Company Links */}
                                <div>
                                    <h5 className="text-md font-bold text-white mb-4">Company</h5>
                                    <ul className="space-y-3 text-sm text-gray-400">
                                        {['About', 'Blogs', 'Privacy Policy', 'Contact', 'Terms of Service'].map(item => (
                                            <li key={item}><a href="#" className="hover:text-purple-400">{item}</a></li>
                                        ))}
                                    </ul>
                                </div>
                
                                {/* Stay Updated */}
                                <div className="col-span-2 md:col-span-1">
                                    <h5 className="text-md font-bold text-white mb-4">Stay Updated</h5>
                                    <p className="text-sm text-gray-400 mb-3">
                                        Subscribe to our newsletter for the latest influencer marketing insights.
                                    </p>
                                    <div className="flex space-x-2">
                                        <input type="email" placeholder="Your email" className="flex-1 bg-gray-800 text-white p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
                                        <button className="bg-purple-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-purple-700">
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                            </div>
                
                            {/* Copyright */}
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800 text-center">
                                <p className="text-sm text-gray-500">
                                    © 2025 InfluenceHub. All rights reserved. Built with React, Node.js, and MongoDB.
                                </p>
                            </div>
                        </footer>

      </div>
    </>
  );
}
