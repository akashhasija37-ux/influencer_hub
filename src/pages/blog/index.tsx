import Head from "next/head";
import Link from "next/link";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/router";
import {
  Search,
  Briefcase,
  ChevronDown,
  Globe,
  DollarSign,
  Heart,
  Target,
  BarChart,
  Code,
  Users,
  Film,
  MessageSquare,
  Lock,
  Sun,
  Moon,
  Zap,
  PlusSquare,
  TrendingUp,
  Instagram,
  ArrowRight, User, LogOut,
} from 'lucide-react';
import Header from "@/components/Header";

type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  primaryKeyword: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "How to Get Brand Deals as an Influencer",
    slug: "get-brand-deals-as-influencer",
    excerpt:
      "Learn how to get brand deals, land paid collaborations, and use brand collaboration websites to monetize your content.",
    category: "For Influencers",
    primaryKeyword: "get brand deals",
  },
  {
    title: "How to Pitch Brands for Paid Collaboration",
    slug: "pitch-brands-for-collaboration",
    excerpt:
      "Discover proven email and DM templates to pitch brands for collaboration and secure paid influencer partnerships.",
    category: "For Influencers",
    primaryKeyword: "pitch brands for collaboration",
  },
  {
    title: "How to Find Influencers for Your Brand",
    slug: "how-to-find-influencers",
    excerpt:
      "Step-by-step guide for brands to find influencers, use influencer discovery tools, and launch successful campaigns.",
    category: "For Brands",
    primaryKeyword: "find influencers",
  },
  {
    title: "Influencer Pricing Guide: How Much Should You Pay?",
    slug: "influencer-pricing-guide",
    excerpt:
      "Complete influencer pricing breakdown, rates by follower count, and how to calculate influencer campaign cost.",
    category: "For Brands",
    primaryKeyword: "influencer pricing",
  },
  {
    title: "What Is a UGC Creator? Complete Guide 2025",
    slug: "ugc-creator-meaning",
    excerpt:
      "Learn what a UGC creator is, how UGC works, and how brands and creators benefit from user-generated content.",
    category: "UGC Industry",
    primaryKeyword: "ugc creator meaning",
  },
];

export default function BlogIndexPage() {

    type AuthUser = {
      id: string;
      name: string;
      email: string;
      role: "ADMIN" | "BRAND" | "INFLUENCER";
    };
    
    // const Header = ({ onNavigate }: { onNavigate: (key: string) => void }) => {
    //   const [isDarkMode, setIsDarkMode] = useState(true);
    //   const [user, setUser] = useState<AuthUser | null>(null);
    //   const [open, setOpen] = useState(false);
    //   const router = useRouter();
    
    //   // 🔐 Check auth state (homepage-safe)
    
    
    // useEffect(() => {
    //   const savedTheme = localStorage.getItem("theme");
    //   if (savedTheme === "dark") {
    //     document.documentElement.classList.add("dark");
    //     setIsDarkMode(true);
    //   } else {
    //     document.documentElement.classList.remove("dark");
    //     setIsDarkMode(false);
    //   }
    // }, []);
    
    // const toggleTheme = () => {
    //   const html = document.documentElement;
    
    //   if (html.classList.contains("dark")) {
    //     html.classList.remove("dark");
    //     localStorage.setItem("theme", "light");
    //     setIsDarkMode(false);
    //   } else {
    //     html.classList.add("dark");
    //     localStorage.setItem("theme", "dark");
    //     setIsDarkMode(true);
    //   }
    // };
    
    
    
    //  useEffect(() => {
    //   fetch("/api/auth/me", {
    //     credentials: "include",
    //   })
    //     .then(res => (res.ok ? res.json() : { user: null }))
    //     .then(data => setUser(data.user))
    //     .catch(() => setUser(null));
    // }, [router.asPath]);
    
    
    //   const logout = async () => {
    //    await fetch("/api/auth/logout", {
    //   method: "POST",
    //   credentials: "include",
    // });
    //     setUser(null);
    //     router.push("/login");
    //   };
    
    //   return (
    //     <header className="sticky top-0 z-50 bg-black text-white shadow-lg border-b border-gray-800">
    //       <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
    //         {/* Logo */}
    //         <div
    //           className="flex items-center space-x-2 cursor-pointer"
    //           onClick={() => router.push("/")}
    //         >
    //           <Target className="w-6 h-6 text-purple-500" />
    //           <span className="text-xl font-bold">InfluenceHub</span>
    //         </div>
    
    //         {/* Navigation */}
    //         <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
    //           {[
    //   { label: "About Us", key: "about" },
    //   { label: "Followers Check", key: "analytics" },
    //   { label: "Search Influencer", key: "for-creators", route: "/for-creators" },
    //   { label: "Brand Jobs", key: "brand-jobs", route: "/brands-job" },
    //   { label: "Blogs", key: "blogs" },
    // ].map(item => (
    //   <button
    //     key={item.key}
    //     onClick={() => {
    //       if (item.route) {
    //         router.push(item.route);
    //       } else {
    //         onNavigate(item.key);
    //       }
    //     }}
    //     className="hover:text-purple-400 transition"
    //   >
    //     {item.label}
    //   </button>
    // ))}
    
    //         </nav>
    
    //         {/* Right Side */}
    //         <div className="flex items-center space-x-4">
    //           {/* Dark Mode */}
    //     <button
    //   className="p-2 rounded-full transition 
    //              text-gray-700 dark:text-purple-400 
    //              hover:bg-gray-200 dark:hover:bg-gray-800"
    //   onClick={toggleTheme}
    // >
    //   {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    // </button>
    
    //           {/* AUTH UI */}
    //           {!user ? (
    //   <>
    //     <button
    //       onClick={() => router.push("/login")}
    //       className="text-sm font-medium hover:text-purple-400 transition"
    //     >
    //       Login
    //     </button>
    //     <button
    //       onClick={() => router.push("/register")}
    //       className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
    //     >
    //       Get Started
    //     </button>
    //   </>
    // ) : (
    //   <div className="relative">
    //     <button
    //       onClick={() => setOpen(!open)}
    //       className="flex items-center gap-2"
    //     >
    //       <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
    //         <User size={16} />
    //       </div>
    //       <span className="text-sm">{user.name}</span>
    //     </button>
    
    //     {open && (
    //       <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg w-44 z-50">
    //         <div className="px-4 py-2 text-xs text-gray-400">
    //           {user.role}
    //         </div>
    
    //         <button
    //           onClick={() => {
    //             setOpen(false);
    //             router.push("/settings");
    //           }}
    //           className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
    //         >
    //           Profile
    //         </button>
    
    //         <button
    //           onClick={() => {
    //             setOpen(false);
    //             logout();
    //           }}
    //           className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
    //         >
    //           <LogOut size={14} /> Logout
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // )}
    
    //         </div>
    //       </div>
    //     </header>
    //   );
    // };
  return (
    <>
      <Head>
        <title>Influencer Marketing Blog | Guides for Brands & Creators</title>
        <meta
          name="description"
          content="Explore influencer marketing guides, creator growth tips, UGC insights, and brand hiring strategies. Learn how to get brand deals, hire influencers, and grow your creator income."
        />
        <meta property="og:title" content="Influencer Marketing Blog" />
        <meta
          property="og:description"
          content="Expert guides for influencers, brands, and UGC creators."
        />
      </Head>
 <Header />
      <div className="min-h-screen bg-black text-white px-6 py-20">
       
        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
            Influencer Marketing Blog
          </h1>

          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-14">
            Actionable guides for influencers, brands, and UGC creators. Learn
            how to get brand deals, hire influencers, and scale campaigns with data.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="bg-[#0b1220] p-6 rounded-xl border border-gray-800 hover:border-purple-600 transition cursor-pointer">
                  <span className="text-xs text-purple-400 font-medium">
                    {post.category}
                  </span>

                  <h2 className="text-xl font-bold mt-3 mb-3">
                    {post.title}
                  </h2>

                  <p className="text-gray-400 text-sm mb-4">
                    {post.excerpt}
                  </p>

                  <span className="text-purple-500 text-sm font-medium">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
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
