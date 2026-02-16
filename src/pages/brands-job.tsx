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

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "BRAND" | "INFLUENCER";
};

export default function ForBrandsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I find influencers for marketing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use advanced search filters to find influencers by niche, audience size, engagement rate, location, and platform. Our AI engine suggests creators matching your campaign goals.",
        },
      },
      {
        "@type": "Question",
        name: "Can small businesses use influencer marketing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Micro-influencers deliver higher engagement and better ROI for small businesses. Start small and scale once results are proven.",
        },
      },
      {
        "@type": "Question",
        name: "How do I verify influencer authenticity?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI fraud detection analyzes follower authenticity and engagement patterns to detect fake accounts with 99% accuracy.",
        },
      },
    ],
  };

  const faqs = [
  {
    q: "How do I find influencers for marketing?",
    a: "Use advanced search filters to find influencers by niche, audience size, engagement rate, and location. Our AI suggests best matches instantly."
  },
  {
    q: "Is this platform good for small businesses?",
    a: "Yes. Micro-influencers deliver higher engagement and better ROI for small business campaigns."
  },
  {
    q: "How do you verify influencer authenticity?",
    a: "Our AI fraud detection analyzes engagement patterns, fake followers, and suspicious activity."
  }
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-900 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-xl bg-black"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left"
              >
                <span className="font-semibold text-white">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    open === index ? "rotate-180 text-purple-400" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-4 text-gray-400 text-sm">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Header = ({ onNavigate }: { onNavigate: (key: string) => void }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // 🔐 Check auth state (homepage-safe)
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
  { label: "Search Influencer", key: "for-creators", route:'/for-creators' },
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
            className="p-2 rounded-full hover:bg-gray-800 transition text-purple-400"
            onClick={() => setIsDarkMode(!isDarkMode)}
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
          Hire Influencers for Your Brand - Discovery Platform
        </title>
        <meta
          name="description"
          content="Hire influencers and find creators for your marketing campaigns. Influencer discovery platform for small businesses. Launch campaigns in minutes."
        />
        <meta
          property="og:title"
          content="Find Influencers for Marketing - Hire Top Creators Today"
        />
        <meta
          property="og:description"
          content="Hire influencers faster. Verified creators. AI matching. Campaign tracking. Built for small businesses."
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <main className="bg-[#0b1220] text-white">
<Header />
        {/* ================= HERO ================= */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Hire the Right Influencers in Minutes, Not Months
          </h1>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10">
            Our influencer discovery platform makes it effortless to
            find influencers for marketing campaigns that convert.
            Whether you're running influencer marketing for small business
            or scaling brand awareness, connect with verified creators instantly.
          </p>

          <Link href="/register?role=BRAND">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Post a Campaign
            </button>
          </Link>
        </section>

        {/* ================= TRUST BAR ================= */}
        <section className="border-y border-gray-800 py-8 bg-[#111827]">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-400">10,000+</p>
              <p className="text-gray-400 text-sm">Brands Hiring Creators</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">500,000+</p>
              <p className="text-gray-400 text-sm">Verified Influencers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">$2B+</p>
              <p className="text-gray-400 text-sm">Campaigns Managed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">5x</p>
              <p className="text-gray-400 text-sm">Average ROI</p>
            </div>
          </div>
        </section>

        {/* ================= PROBLEM ================= */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-6">
            The Challenge: Finding the Right Influencers for Marketing
          </h2>

          <ul className="space-y-4 text-gray-300">
            <li>✗ Manually searching thousands of creator profiles</li>
            <li>✗ Guessing engagement authenticity</li>
            <li>✗ Negotiating contracts without standardization</li>
            <li>✗ No real-time campaign analytics</li>
            <li>✗ Complicated payment processing</li>
          </ul>

          <p className="mt-8 text-lg text-gray-200">
            Our influencer discovery platform eliminates these pain points,
            letting you hire influencers confidently and launch campaigns
            in days instead of weeks.
          </p>
        </section>

        {/* ================= BENEFITS ================= */}
        <section className="bg-[#111827] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Why Hire Influencers?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
  {[
    "Authentic storytelling builds trust 3.3x higher than ads",
    "60% lower acquisition cost vs paid ads",
    "Micro-influencers deliver 20:1 ROI",
    "Launch campaigns in 24-48 hours",
    "Repurpose influencer content across channels",
    "AI matching saves 10+ hours per campaign",
  ].map((item, i) => (
    <div
      key={i}
      className="bg-[#0b1220] p-6 rounded-xl border border-gray-800 
                 transition-all duration-300 ease-in-out
                 hover:bg-purple-700/20 
                 hover:border-purple-600
                 hover:-translate-y-2
                 hover:shadow-xl"
    >
      <p className="text-gray-300 hover:text-white transition-colors duration-300">
        {item}
      </p>
    </div>
  ))}
</div>

          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Brands Choose Our Influencer Discovery Platform
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "500,000+ verified influencer database",
              "AI fraud detection & authenticity scoring",
              "Intelligent creator matching",
              "Transparent ROI dashboards",
              "Built-in campaign management tools",
              "Secure escrow-style payments",
            ].map((feature, i) => (
              <div
                key={i}
                className="border border-gray-800 p-6 rounded-xl
                hover:bg-purple-700/20 
                 hover:border-purple-600
                 hover:-translate-y-2
                 hover:shadow-xl
                "
              >
                <h3 className="font-semibold text-lg mb-2">
                  {feature}
                </h3>
                <p className="text-white-900 text-md">
                  Designed to help brands hire influencers confidently and
                  scale campaigns efficiently.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TESTIMONIAL ================= */}
        <section className="bg-[#111827] py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-10">
              Real Brands, Real Results
            </h2>

            <blockquote className="text-xl italic text-gray-300">
              “We cut influencer hiring time from 6 weeks to 3 days.
              The fraud detection alone saved us $50K.”
            </blockquote>
            <p className="mt-4 text-gray-400">
              — Growth Director, E-commerce Brand
            </p>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <FAQSection />

        {/* ================= CTA ================= */}
        <section className="text-center py-16 border-t border-gray-800">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Hire Influencers?
          </h2>
          <Link href="/register?role=BRAND">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Get Started Today
            </button>
          </Link>
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

      </main>
    </>
  );
}
