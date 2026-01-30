import Head from 'next/head';
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

/* -------------------- DATA -------------------- */

const engagementData = [
  { name: 'Jan', rate: 4.5 },
  { name: 'Feb', rate: 5.1 },
  { name: 'Mar', rate: 5.8 },
  { name: 'Apr', rate: 6.3 },
  { name: 'May', rate: 6.8 },
  { name: 'Jun', rate: 7.2 },
];

const pieData = [
  { name: '18-24', value: 35, color: '#9333ea' },
  { name: '25-34', value: 45, color: '#f87171' },
  { name: '35-44', value: 10, color: '#fb923c' },
  { name: '45+', value: 10, color: '#a3a3a3' },
];

const locationData = [
  { name: 'USA', value: 350 },
  { name: 'UK', value: 250 },
  { name: 'Canada', value: 150 },
  { name: 'Australia', value: 100 },
  { name: 'Others', value: 150 },
];

const JobCard = ({ job }: any) => (
  <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
      <span className="text-xs font-medium bg-purple-600 text-white px-3 py-1 rounded-full">
        {job.category}
      </span>
    </div>
    <p className="text-sm text-gray-400 mt-1">{job.brand}</p>
    
    <div className="mt-4 text-sm space-y-2 text-gray-400">
      <p>Budget: <span className="text-white font-medium">{job.budget}</span></p>
      <p>Deadline: <span className="text-white font-medium">{job.deadline}</span></p>
      <p>Location: <span className="text-white font-medium">{job.location}</span></p>
      <p>Applicants: <span className="text-white font-medium">{job.applicants}</span></p>
    </div>
    
    <button className="mt-5 w-full bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transition">
      Apply Now
    </button>
  </div>
);

const influencerResults = [
  { name: 'Sarah Johnson', username: '@sarahjstyle', avatarInitial: 'SJ', tags: ['Fashion', 'Beauty'], followers: '245K', engagement: '6.8%', cost: '$2,500 - $5,000' },
  { name: 'Mike Anderson', username: '@mikefit', avatarInitial: 'MA', tags: ['Fitness', 'Health'], followers: '180K', engagement: '7.2%', cost: '$1,800 - $4,000' },
  { name: 'Alex Chen', username: '@alextech', avatarInitial: 'AC', tags: ['Tech', 'Gadgets'], followers: '92K', engagement: '5.4%', cost: '$1,200 - $2,500' },
  { name: 'Emma Rodriguez', username: '@emmacreates', avatarInitial: 'ER', tags: ['Beauty', 'Lifestyle'], followers: '156K', engagement: '8.1%', cost: '$2,000 - $4,500' },
  { name: 'James Wilson', username: '@jameswtravel', avatarInitial: 'JW', tags: ['Travel', 'Adventure'], followers: '215K', engagement: '4.9%', cost: '$2,200 - $4,800' },
  { name: 'Lisa Thompson', username: '@lisafoodie', avatarInitial: 'LT', tags: ['Food', 'Cooking'], followers: '128K', engagement: '6.5%', cost: '$1,500 - $3,200' },
];

const featuredJobs = [
  { title: 'Video Editor for YouTube Content', category: 'Video Editing', brand: 'Creative Media Co.', budget: '$500 - $1,200 per video', deadline: 'Dec 15, 2025', location: 'Remote', applicants: 18 },
  { title: 'Social Media Graphic Designer', category: 'Graphic Design', brand: 'BrandBoost Agency', budget: '$800 - $1,500/month', deadline: 'Nov 30, 2025', location: 'Remote', applicants: 24 },
  { title: 'Cameraman for TikTok & Instagram Reels', category: 'Videography', brand: 'Content Creators Hub', budget: '$300 - $600 per day', deadline: 'Dec 20, 2025', location: 'Los Angeles, CA', applicants: 12 },
];

const InfluencerCard = ({ influencer }: any) => (
  <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 shadow-xl flex flex-col items-center text-center">
    <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-3xl font-bold text-white mb-3">
      {influencer.avatarInitial}
    </div>
    <h3 className="text-lg font-semibold text-white">{influencer.name}</h3>
    <p className="text-sm text-purple-400">{influencer.username}</p>
    
    <div className="mt-4 flex space-x-2">
      {influencer.tags.map((tag: string) => (
        <span key={tag} className="text-xs font-medium bg-gray-800 text-gray-400 px-3 py-1 rounded-full">
          {tag}
        </span>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-y-2 mt-4 w-full text-sm border-t border-gray-800 pt-4">
      <div className="text-left">
        <p className="font-bold text-white">{influencer.followers}</p>
        <p className="text-xs text-gray-500">Followers</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-green-400">{influencer.engagement}</p>
        <p className="text-xs text-gray-500">Engagement</p>
      </div>
      <div className="col-span-2 mt-2">
        <p className="text-sm text-gray-400">Est. Collaboration Cost</p>
        <p className="font-semibold text-purple-400">{influencer.cost}</p>
      </div>
    </div>
    
    <button className="mt-5 w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition">
      View Analytics
    </button>
  </div>
);

/* -------------------- HEADER -------------------- */

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "BRAND" | "INFLUENCER";
};

const Header = ({ onNavigate }: { onNavigate: (key: string) => void }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
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
            { label: "About Us", key: "about" },
            { label: "Followers Check", key: "analytics" },
            { label: "Search Influencer", key: "search" },
            { label: "Brand Jobs", key: "jobs" },
            { label: "Blogs", key: "blogs" },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
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
            <div className="relative group">
              <button className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="text-sm">{user.name}</span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-gray-900 border border-gray-700 rounded-lg w-44">
                <div className="px-4 py-2 text-xs text-gray-400">
                  {user.role}
                </div>
                <button
                  onClick={() => router.push("/settings")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
                >
                  Profile
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


/* -------------------- PAGE -------------------- */

export default function HomePage() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLElement | null>(null);
  const jobsRef = useRef<HTMLElement | null>(null);
  const analyticsRef = useRef<HTMLElement | null>(null);
  const blogsRef = useRef<HTMLElement | null>(null);
const router = useRouter();
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

  const handleSearch = async (query: string) => {
  router.push('/register')
  };

// --- Internal Component: SearchFilter ---
const SearchFilter = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
      <div className="flex space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search any influencer or username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-black text-white border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={() => onSearch(query)}
          className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Search
        </button>
      </div>

      <div className="mb-6">
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm font-medium text-purple-400 hover:text-purple-500 transition flex items-center"
        >
          <ChevronDown
            className={`w-4 h-4 mr-1 transition-transform ${
              showFilters ? 'rotate-180' : ''
            }`}
          />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-800">
          {[
            { label: 'Platform', options: ['All Platforms', 'Instagram', 'YouTube', 'TikTok'] },
            { label: 'Budget Range', options: ['Any Budget', '$1k - $5k', '$5k - $10k'] },
            { label: 'Category', options: ['All Categories', 'Fashion', 'Fitness', 'Tech'] },
          ].map(filter => (
            <div key={filter.label}>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {filter.label}
              </label>
              <select className="w-full bg-black text-white border border-gray-700 rounded-lg py-3 px-4 text-sm">
                {filter.options.map(opt => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



  return (
    <>
      <Head>
        <title>InfluenceHub - Discover Influencers That Drive Real Results</title>
        <meta
          name="description"
          content="Find trending influencers, analyze their audience, and collaborate smarter."
        />
      </Head>

      <div className="min-h-screen bg-black text-white font-inter">
        <Header onNavigate={scrollToSection} />

        {/* 1. HERO */}
        <section
          ref={aboutRef}
          className="text-center py-20 md:py-32 bg-gray-900 border-b border-gray-800"
        >
         <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center text-sm font-medium bg-purple-900/50 text-purple-400 px-4 py-1 rounded-full mb-6 border border-purple-800">
              <Lock className="w-4 h-4 mr-2" />
              Trusted by 500+ brands worldwide
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Discover Influencers That Drive Real Results
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Search trending influencers, analyze their audience, and collaborate smarter. Connect with creators who match your brand goals.
            </p>
            <div className="flex justify-center space-x-4">
              <button
            onClick={() => scrollToSection('analytics')}
            className="flex items-center bg-purple-600 text-white text-lg px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
          >
            <Search className="w-5 h-5 mr-3" /> Search Influencers
          </button>

          <button
            onClick={() => scrollToSection('jobs')}
            className="flex items-center bg-gray-800 text-white text-lg px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition border border-gray-700"
          >
            <Briefcase className="w-5 h-5 mr-3" /> Post a Job
          </button>
            </div>
            <p className="text-sm text-gray-500 mt-6">Trusted by Leading Brands Worldwide</p>
            <div className="flex justify-center space-x-8 mt-4 text-gray-500 text-sm font-semibold">
                {['Apple', 'Google', 'Amazon', 'Netflix', 'Spotify', 'Tesla', 'Microsoft'].map(name => (
                    <span key={name} className='hidden md:inline'>{name}</span>
                ))}
            </div>
          </div>
         
        </section>

        {/* 2. SEARCH */}
        <section ref={searchRef} className="py-16 max-w-7xl mx-auto px-4">
          <SearchFilter onSearch={handleSearch} />
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {influencerResults.map(influencer => (
                <InfluencerCard key={influencer.username} influencer={influencer} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="inline-flex rounded-lg shadow-sm -space-x-px text-sm font-medium">
                <a href="#" className="px-4 py-2 border border-gray-700 bg-gray-900 text-gray-400 hover:bg-gray-800 rounded-l-lg">Previous</a>
                <a href="#" className="px-4 py-2 border border-gray-700 bg-purple-700 text-white hover:bg-purple-800">1</a>
                <a href="#" className="px-4 py-2 border border-gray-700 bg-gray-900 text-gray-400 hover:bg-gray-800">2</a>
                <a href="#" className="px-4 py-2 border border-gray-700 bg-gray-900 text-gray-400 hover:bg-gray-800">3</a>
                <a href="#" className="px-4 py-2 border border-gray-700 bg-gray-900 text-gray-400 hover:bg-gray-800 rounded-r-lg">Next</a>
              </nav>
            </div>
          </div>
        </section>

        {/* 3. JOBS */}
        <section ref={jobsRef} className="py-20 bg-gray-900 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                      <h2 className="text-4xl font-extrabold text-white mb-4">
                        Post a Collaboration or Campaign
                      </h2>
                      <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
                        Connect with influencers who match your brand goals. Post your campaign and receive applications from verified creators.
                      </p>
                      <button className="flex items-center mx-auto bg-purple-600 text-white text-lg px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg">
                        <PlusSquare className="w-5 h-5 mr-3" /> Post a Job
                      </button>
                      
                      <div className="mt-16 text-left">
                        <h3 className="text-2xl font-bold text-white mb-6">Featured Campaigns</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {featuredJobs.map(job => (
                            <JobCard key={job.title} job={job} />
                          ))}
                        </div>
                        <div className="text-center mt-8">
                          <a href="#" className="text-purple-400 text-lg font-medium hover:text-purple-500 transition border-b border-purple-400">
                            View All Jobs
                          </a>
                        </div>
                      </div>
                    </div>
        </section>

        {/* 4. ANALYTICS */}
        <section ref={analyticsRef} className="py-20 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center text-sm font-medium bg-purple-900/50 text-purple-400 px-4 py-1 rounded-full mb-4 border border-purple-800">
              <BarChart className="w-4 h-4 mr-2" /> AI-Powered Analysis
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Influencer Authenticity Tracker
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Detect fake followers, analyze engagement quality, and verify influencer authenticity with our advanced AI-powered analytics.
            </p>
          </div>

           {/* Tracker Input */}
                    <div className="max-w-3xl mx-auto flex space-x-4 mb-16">
                      <input 
                        type="text" 
                        placeholder="Enter influencer username or profile URL..." 
                        className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <div className="relative">
                        <select className="bg-gray-900 text-white border border-gray-700 rounded-lg py-3 px-8 text-sm appearance-none focus:outline-none">
                          <option>Instagram</option>
                          <option>YouTube</option>
                          <option>TikTok</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center">
                        <BarChart className="w-4 h-4 mr-2" /> Analyze
                      </button>
                    </div>

                    {/* Trending Section */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
              <Users className="w-6 h-6 mr-3 text-purple-500" /> Who's Trending Now?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {influencerResults.slice(0, 4).map(influencer => (
                <InfluencerCard key={influencer.username} influencer={influencer} />
              ))}
            </div>
            <div className="text-center mt-12">
                <a href="#" className="text-purple-400 text-lg font-medium hover:text-purple-500 transition flex items-center justify-center">
                    See it in action <ArrowRight className="w-5 h-5 ml-2" />
                </a>
            </div>
          </div>
        </section>

         {/* --- 5. Discovery & Platform Features --- */}
                <section className="py-20 bg-gray-900 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Demo Video Placeholder */}
                        <div className="relative w-full h-96 bg-gray-800 rounded-xl flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer hover:scale-105 transition duration-300">
                                <Film className="w-8 h-8 text-white fill-current" />
                            </div>
                            <p className="absolute bottom-6 left-6 text-white font-medium">Platform Demo</p>
                            <div className="absolute bottom-6 right-6 flex items-center text-green-400 text-sm font-medium">
                                <span className="w-2.5 h-2.5 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                Live Analytics
                            </div>
                        </div>
        
                        {/* Right: Feature List */}
                        <div>
                            <h2 className="text-4xl font-extrabold text-white mb-6">
                                Experience the Power of Data-Driven Influencer Discovery
                            </h2>
                            <p className="text-lg text-gray-400 mb-8">
                                Our platform combines advanced analytics with intuitive search to help you find the perfect influencers for your brand campaigns.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { icon: BarChart, title: 'Deep Audience Insights', desc: 'Understand demographics, engagement patterns, and audience authenticity with real-time data.' },
                                    { icon: TrendingUp, title: 'Performance Tracking', desc: 'Monitor engagement trends and track ROI across all your influencer partnerships.' },
                                    { icon: Zap, title: 'Smart Recommendations', desc: 'AI-powered matching connects you with influencers that align with your brand values and goals.' },
                                ].map(feature => (
                                    <div key={feature.title} className="flex items-start space-x-4">
                                        <div className="p-3 bg-purple-600 rounded-lg flex-shrink-0 mt-1">
                                            <feature.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-white">{feature.title}</h4>
                                            <p className="text-gray-400 text-sm">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-extrabold text-white mb-4">
                                    Influencer Analytics: Make Data-Driven Decisions
                                </h2>
                                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                                    Get detailed insights before you collaborate. Make data-driven decisions with real-time analytics.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Chart 1: Audience Demographics */}
                                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                                    <h4 className="text-lg font-semibold text-white mb-4">Audience Demographics</h4>
                                    <p className="text-sm text-gray-400 mb-6">Age distribution of followers</p>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="text-center text-sm space-y-1 mt-4">
                                        {pieData.map(d => (
                                            <p key={d.name} className="text-gray-400"><span className="inline-block w-2.5 h-2.5 mr-2 rounded-full" style={{ backgroundColor: d.color }}></span>{d.name}: {d.value}%</p>
                                        ))}
                                    </div>
                                </div>
                
                                {/* Chart 2: Engagement Trend */}
                                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                                    <h4 className="text-lg font-semibold text-white mb-4">Engagement Trend</h4>
                                    <p className="text-sm text-gray-400 mb-6">6-month engagement rate history</p>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={engagementData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                            <XAxis dataKey="name" stroke="#9ca3af" />
                                            <YAxis domain={[4, 8]} tickCount={5} stroke="#9ca3af" />
                                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: 'white' }} />
                                            <Line type="monotone" dataKey="rate" stroke="#a78bfa" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                
                                {/* Chart 3: Audience Location */}
                                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                                    <h4 className="text-lg font-semibold text-white mb-4">Audience Location</h4>
                                    <p className="text-sm text-gray-400 mb-6">Geographic distribution</p>
                                    <div className="space-y-3">
                                        {locationData.sort((a, b) => b.value - a.value).map(d => (
                                            <div key={d.name} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">{d.name}</span>
                                                <div className="flex-1 h-2 bg-gray-800 rounded-full mx-4">
                                                    <div 
                                                        className="h-2 bg-purple-600 rounded-full" 
                                                        style={{ width: `${(d.value / 350) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-white font-medium">{Math.round((d.value / 1000) * 100)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bottom Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center">
                                {[
                                    { value: '98%', label: 'Data Accuracy' },
                                    { value: '10M+', label: 'Profiles Analyzed' },
                                    { value: 'Real-time', label: 'Updates' },
                                    { value: '195', label: 'Countries' },
                                ].map(stat => (
                                    <div key={stat.label} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                                        <p className="text-4xl font-extrabold text-white">{stat.value}</p>
                                        <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                
                            <div className="text-center mt-12">
                                <div className="inline-flex items-center text-sm font-medium bg-purple-900/50 text-purple-400 px-4 py-1 rounded-full border border-purple-800">
                                    Trusted by 500+ brands and 10,000+ influencers
                                </div>
                            </div>
                        </section>


                         {/* --- 7. Testimonials --- */}
        <section className="py-20 bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-extrabold text-white mb-4">
                    What Our Clients Say
                </h2>
                <p className="text-lg text-gray-400 mb-12">
                    Join hundreds of satisfied marketers and brands like yours.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {[
                        { quote: "InfluenceHub transformed how we find and collaborate with influencers. The analytics are incredibly detailed and accurate.", name: "Jessica Martinez", title: "Marketing Director at BrandCo" },
                        { quote: "The platform saved us countless hours. We found the perfect influencers for our campaign in just days instead of weeks.", name: "David Kim", title: "CMO at TechStart" },
                        { quote: "Outstanding platform with real-time data. The ROI tracking and engagement metrics are game-changing for our campaigns.", name: "Emily Chen", title: "Brand Manager at FashionHub" },
                    ].map((testimonial, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                            <span className="text-5xl font-extrabold text-purple-500">"</span>
                            <p className="text-lg text-gray-300 mt-2 mb-4 italic">
                                {testimonial.quote}
                            </p>
                            <p className="font-bold text-white mt-4">{testimonial.name}</p>
                            <p className="text-sm text-gray-400">{testimonial.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* BLOGS / FOOTER */}
        <section ref={blogsRef}></section>

         {/* --- 8. Footer --- */}
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
