import Head from "next/head";
import Link from "next/link";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/router";
import {
  Search,Target, ShieldCheck, Users, BarChart3, Globe, Zap,
  Briefcase,
  ChevronDown,
  DollarSign,
  Heart,
  BarChart,
  Code,
  Film,
  MessageSquare,
  Lock,
  Sun,
  Moon,
  PlusSquare,
  TrendingUp,
  Instagram,
  ArrowRight, User, LogOut,
} from 'lucide-react';

export default function AboutUs() {

    type AuthUser = {
      id: string;
      name: string;
      email: string;
      role: "ADMIN" | "BRAND" | "INFLUENCER";
    };

     const aboutRef = useRef<HTMLElement | null>(null);
      const searchRef = useRef<HTMLElement | null>(null);
      const jobsRef = useRef<HTMLElement | null>(null);
      const analyticsRef = useRef<HTMLElement | null>(null);
      const blogsRef = useRef<HTMLElement | null>(null);

    const scrollToSection = (key: string) => {
    const map: Record<string, HTMLElement | null> = {
      about: aboutRef.current,
      search: searchRef.current,
      jobs: jobsRef.current,
      analytics: analyticsRef.current,
      blogs: blogsRef.current,
    };

    const el = map[key];
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
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

  return (
    <>
      <Head>
        <title>About InfluenceHub | Influencer Marketing Platform</title>
        <meta
          name="description"
          content="Learn about InfluenceHub – the influencer discovery platform helping brands hire authentic creators and helping influencers get paid collaborations worldwide."
        />
        <meta
          name="keywords"
          content="about influencer marketing platform, influencer discovery platform, hire influencers, influencer brand deals, fake follower detection"
        />
      </Head>

     <Header onNavigate={scrollToSection} />

      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">

        {/* ================= HERO ================= */}
        <section className="py-20 px-6 text-center bg-gradient-to-b from-purple-50 to-white dark:from-[#0b1220] dark:to-black">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
              <Target className="w-4 h-4 mr-2" />
              Influencer Discovery Platform
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Connecting Brands & Creators Globally
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              InfluenceHub helps brands hire authentic influencers and helps creators
              unlock paid collaborations, sponsorships, and brand deals — all in one platform.
            </p>
          </div>
        </section>

        {/* ================= OUR STORY ================= */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why We Built InfluenceHub
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Influencer marketing was broken. Brands struggled to find real influencers.
                Creators struggled to get paid fairly. Fake followers were everywhere.
                Negotiations happened in DMs. Payments were delayed.
              </p>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We built InfluenceHub to create transparency in influencer marketing —
                with real analytics, fraud detection, verified creators, and secure payments.
                Whether you're a startup hiring micro-influencers or a creator seeking
                brand deals, our platform simplifies everything.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: "Fraud Detection", desc: "AI-powered fake follower analysis" },
                { icon: Users, title: "Verified Creators", desc: "Authentic influencer database" },
                { icon: BarChart3, title: "Real Analytics", desc: "Track ROI & campaign metrics" },
                { icon: Globe, title: "Global Reach", desc: "Brands & creators worldwide" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0b1220] hover:shadow-lg transition"
                >
                  <item.icon className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-4" />
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="py-20 px-6 bg-gray-100 dark:bg-[#0b1220]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">

            {[
              { value: "500K+", label: "Verified Influencers" },
              { value: "10K+", label: "Brands Hiring" },
              { value: "$2B+", label: "Campaigns Managed" },
              { value: "5x ROI", label: "Average Campaign Return" },
            ].map((stat, i) => (
              <div key={i}>
                <h3 className="text-4xl font-extrabold text-purple-600 dark:text-purple-400">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <Zap className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-6" />

            <h2 className="text-3xl font-bold mb-6">
              Our Mission
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              To build the most transparent, data-driven influencer ecosystem
              where brands confidently hire influencers and creators monetize
              their audience fairly — without middlemen exploitation or fake metrics.
            </p>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Grow With InfluenceHub?
            </h2>

            <p className="mb-8 text-purple-100">
              Join thousands of brands and creators using our influencer
              discovery platform to grow faster.
            </p>

            <div className="flex justify-center gap-6">
              <Link href="/register">
                <button className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition">
                  Get Started
                </button>
              </Link>

              <Link href="/for-brands">
                <button className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-purple-700 transition">
                  Hire Influencers
                </button>
              </Link>
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
