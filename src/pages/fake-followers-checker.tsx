import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from 'react';
import { Users, Briefcase, DollarSign, ShieldCheck, ArrowRight,Search, AlertTriangle, BarChart3,
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

export default function FakeFollowersChecker() {
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("Instagram");

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
    { label: "Followers Check", key: "fake-followers-checker", route:'/fake-followers-checker' },
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does a fake followers checker work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A fake followers checker analyzes engagement rate, follower growth patterns, audience quality, and suspicious activity signals to detect fake followers or bot engagement."
        }
      },
      {
        "@type": "Question",
        name: "Can I check Instagram fake followers for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our Instagram fake follower check tool allows brands and creators to analyze influencer authenticity and detect fake engagement instantly."
        }
      },
      {
        "@type": "Question",
        name: "Why is detecting fake followers important?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Detecting fake followers protects brands from wasting marketing budgets on influencers with bot followers and ensures real ROI from influencer campaigns."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Fake Followers Checker – Instagram Audit Tool</title>
        <meta
          name="description"
          content="Check fake followers instantly. Instagram fake follower check tool to detect bot followers, analyze engagement rate, and verify influencer authenticity."
        />
        <meta
          name="keywords"
          content="fake followers checker, instagram fake follower check, detect fake followers, influencer authenticity checker, engagement rate calculator"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
<Header />
        {/* HERO */}
        <section className="py-20 text-center border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center text-sm font-medium bg-purple-900/40 text-purple-400 px-4 py-1 rounded-full mb-6 border border-purple-800">
              <ShieldCheck className="w-4 h-4 mr-2" />
              AI-Powered Fake Follower Detection
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Instagram Fake Followers Checker
            </h1>

            <p className="text-lg text-gray-400 mb-10">
              Detect fake followers, analyze engagement quality, and verify influencer authenticity in seconds. Protect your marketing budget from bot engagement.
            </p>

            {/* SEARCH BAR */}
            <div className="flex flex-col md:flex-row gap-4 justify-center max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Enter influencer username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3"
              >
                <option>Instagram</option>
                <option>YouTube</option>
                <option>TikTok</option>
              </select>

              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition">
                <Search className="w-4 h-4 mr-2" />
                Check Now
              </button>
            </div>
          </div>
        </section>

        {/* WHY IMPORTANT */}
        <section className="py-20 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Detect Fake Followers?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: AlertTriangle,
                title: "Avoid Budget Waste",
                desc: "Brands lose thousands partnering with influencers who have bot followers. Our fake followers checker protects your ROI."
              },
              {
                icon: BarChart3,
                title: "Analyze Real Engagement",
                desc: "Engagement rate reveals audience authenticity. Detect suspicious spikes and fake activity instantly."
              },
              {
                icon: ShieldCheck,
                title: "Verify Influencer Authenticity",
                desc: "Make data-driven decisions before hiring influencers for marketing campaigns."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#0b1220] p-8 rounded-xl border border-gray-800 hover:border-purple-600 hover:shadow-lg transition"
              >
                <item.icon className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 bg-gray-900 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              How Our Fake Followers Checker Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                "Enter Instagram username",
                "AI analyzes engagement rate & follower patterns",
                "Get authenticity score & fake follower estimate"
              ].map((step, i) => (
                <div key={i} className="p-6">
                  <div className="text-4xl font-bold text-purple-500 mb-4">
                    {i + 1}
                  </div>
                  <p className="text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "How accurate is this Instagram fake follower check?",
                a: "Our AI analyzes multiple authenticity signals including engagement rate, audience quality, suspicious spikes, and comment patterns to detect fake followers with high accuracy."
              },
              {
                q: "Can brands use this before hiring influencers?",
                a: "Absolutely. Brands use our influencer authenticity checker to verify creators before launching campaigns."
              },
              {
                q: "Is engagement rate important?",
                a: "Yes. Engagement rate is one of the strongest indicators of real audience interaction versus bot activity."
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-[#0b1220] p-6 rounded-lg border border-gray-800"
              >
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
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
