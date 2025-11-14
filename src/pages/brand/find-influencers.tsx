import Head from 'next/head';
import { Search, ChevronDown, Heart, MessageSquare, Star, SlidersHorizontal } from 'lucide-react';

// Static data for the influencer cards
const influencers = [
  {
    name: 'Alisha Hayes',
    username: '@alishastyle',
    avatar: 'https://placehold.co/100x100/fbcfe8/ffffff?text=AH&font=inter',
    platform: 'Instagram',
    followers: '230K',
    engagement: '4.5%',
    rating: 4.8,
    tags: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    name: 'Marcus Cole',
    username: '@techmarcus',
    avatar: 'https://placehold.co/100x100/a78bfa/ffffff?text=MC&font=inter',
    platform: 'YouTube',
    followers: '1.1M',
    engagement: '8.2%',
    rating: 4.9,
    tags: ['Tech', 'Gadgets', 'Reviews'],
  },
  {
    name: 'Elena Rodriguez',
    username: '@fit_elena',
    avatar: 'https://placehold.co/100x100/fcd34d/ffffff?text=ER&font=inter',
    platform: 'TikTok',
    followers: '780K',
    engagement: '12.1%',
    rating: 4.7,
    tags: ['Fitness', 'Health', 'Workout'],
  },
  {
    name: 'David Kim',
    username: '@davidfoodie',
    avatar: 'https://placehold.co/100x100/bbf7d0/ffffff?text=DK&font=inter',
    platform: 'Instagram',
    followers: '450K',
    engagement: '5.1%',
    rating: 4.8,
    tags: ['Food', 'Travel', 'Cooking'],
  },
];

// Helper component for influencer cards
const InfluencerCard = ({ influencer }: any) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="p-5">
      <div className="flex items-center space-x-4">
        <img
          className="h-20 w-20 rounded-full object-cover"
          src={influencer.avatar}
          alt={influencer.name}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{influencer.name}</h3>
          <p className="text-sm text-purple-600 font-medium">{influencer.username}</p>
          <div className="flex items-center text-sm text-yellow-500 mt-1">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold ml-1">{influencer.rating}</span>
            <span className="text-gray-500 ml-1">(120 Reviews)</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-center mt-5">
        <div>
          <p className="text-xl font-bold text-gray-800">{influencer.followers}</p>
          <p className="text-xs text-gray-500 uppercase">Followers</p>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-800">{influencer.engagement}</p>
          <p className="text-xs text-gray-500 uppercase">Engagement</p>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-800">{influencer.platform}</p>
          <p className="text-xs text-gray-500 uppercase">Platform</p>
        </div>
      </div>
      <div className="mt-4">
        {influencer.tags.map((tag: string) => (
          <span
            key={tag}
            className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-2">
      <button className="p-3 bg-gray-50 text-gray-700 hover:bg-gray-100 text-sm font-medium flex items-center justify-center">
        <MessageSquare className="w-4 h-4 mr-2" /> Message
      </button>
      <button className="p-3 bg-purple-50 text-purple-700 hover:bg-purple-100 text-sm font-medium flex items-center justify-center border-l border-gray-200">
        <Heart className="w-4 h-4 mr-2" /> Save
      </button>
    </div>
  </div>
);

// Helper for filter inputs
const FilterInput = ({ label }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative mt-1">
      <input
        type="text"
        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  </div>
);


export default function FindInfluencersPage() {
  return (
    <>
      <Head>
        <title>Find Influencers - Influencer Hub</title>
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Column 1: Filters */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <SlidersHorizontal className="w-5 h-5 mr-2" /> Filters
            </h2>
            <form className="space-y-4">
              <FilterInput label="Platform" />
              <FilterInput label="Niche / Category" />
              <FilterInput label="Follower Range" />
              <FilterInput label="Engagement Rate" />
              <FilterInput label="Country / Region" />
              <FilterInput label="Audience Age" />
              <button
                type="submit"
                className="w-full bg-purple-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-purple-700"
              >
                Apply Filters
              </button>
            </form>
          </div>
        </aside>

        {/* Column 2: Search Bar & Results */}
        <main className="lg:col-span-3">
          {/* Search Bar */}
          <div className="relative mb-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="w-5 h-5 text-gray-400" />
            </span>
            <input
              type="search"
              placeholder="Search by name, username, or keyword (e.g., 'fashion')"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-base"
            />
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {influencers.map((inf) => (
              <InfluencerCard key={inf.username} influencer={inf} />
            ))}
          </div>

          {/* Pagination (Static) */}
          <div className="flex justify-center mt-8">
            <nav className="inline-flex rounded-lg shadow-sm -space-x-px">
              <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-lg">Prev</a>
              <a href="#" className="px-4 py-2 border border-gray-300 bg-purple-50 text-purple-600 text-sm font-medium">1</a>
              <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">2</a>
              <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">3</a>
              <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-r-lg">Next</a>
            </nav>
          </div>
        </main>
      </div>
    </>
  );
}