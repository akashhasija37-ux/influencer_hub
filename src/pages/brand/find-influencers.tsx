import Head from "next/head";
import {
  Search,
  ChevronDown,
  Heart,
  MessageSquare,
  Star,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

/* ------------------ CARD (UNCHANGED) ------------------ */
const InfluencerCard = ({ influencer }: any) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="p-5">
      <div className="flex items-center space-x-4">
        <img
          className="h-20 w-20 rounded-full object-cover"
          src={influencer?.avatar}
          alt={influencer?.name}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {influencer?.name}
          </h3>
          <p className="text-sm text-purple-600 font-medium">
            {influencer?.username}
          </p>
          <div className="flex items-center text-sm text-yellow-500 mt-1">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold ml-1">{influencer?.rating}</span>
            <span className="text-gray-500 ml-1">(120 Reviews)</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-center mt-5">
        <div>
          <p className="text-xl font-bold text-gray-800">
            {influencer?.followers}
          </p>
          <p className="text-xs text-gray-500 uppercase">Followers</p>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-800">
            {influencer?.engagementRate}
          </p>
          <p className="text-xs text-gray-500 uppercase">Engagement</p>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-800">
            {influencer?.platform}
          </p>
          <p className="text-xs text-gray-500 uppercase">Platform</p>
        </div>
      </div>

      <div className="mt-4">
        {influencer?.tags?.map((tag: string) => (
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

/* ------------------ FILTER INPUT (SAME UI) ------------------ */
const FilterInput = ({ label, value, onChange }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative mt-1">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  </div>
);

/* ------------------ PAGE ------------------ */
export default function FindInfluencersPage() {
  const [influencers, setInfluencers] = useState([]);
  const [filters, setFilters] = useState({
    platform: "",
    niche: "",
    followers: "",
    engagement: "",
    country: "",
    search: "",
  });

  useEffect(() => {
  fetch(
    `/api/brand/influencers?platform=${filters.platform}&niche=${filters.niche}&followers=${filters.followers}&engagement=${filters.engagement}&country=${filters.country}&search=${filters.search}`
  )
    .then(res => res.json())
    .then(json => {
      console.log("API RESPONSE:", json); // keep once for sanity
      setInfluencers(Array.isArray(json.data) ? json.data : []);
    });
}, [filters]);


  console.log(influencers)

  return (
    <>
      <Head>
        <title>Find Influencers - Influencer Hub</title>
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-5 rounded-lg shadow-sm border sticky top-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <SlidersHorizontal className="w-5 h-5 mr-2" /> Filters
            </h2>

            <form className="space-y-4">
              <FilterInput
                label="Platform"
                value={filters?.platform}
                onChange={(v: string) =>
                  setFilters({ ...filters, platform: v })
                }
              />
              <FilterInput
                label="Niche / Category"
                value={filters.niche}
                onChange={(v: string) =>
                  setFilters({ ...filters, niche: v })
                }
              />
              <FilterInput
                label="Follower Range"
                value={filters.followers}
                onChange={(v: string) =>
                  setFilters({ ...filters, followers: v })
                }
              />
              <FilterInput
                label="Engagement Rate"
                value={filters.engagementRate}
                onChange={(v: string) =>
                  setFilters({ ...filters, engagement: v })
                }
              />
              <FilterInput
                label="Country / Region"
                value={filters.country}
                onChange={(v: string) =>
                  setFilters({ ...filters, country: v })
                }
              />

              <button
                type="button"
                className="w-full bg-purple-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-purple-700"
              >
                Apply Filters
              </button>
            </form>
          </div>
        </aside>

        {/* Results */}
        <main className="lg:col-span-3">
          <div className="relative mb-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="w-5 h-5 text-gray-400" />
            </span>
            <input
              type="search"
              className="w-full pl-12 pr-4 py-3 rounded-lg border"
              placeholder="Search by name, username, or keyword"
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {influencers?.map((inf: any) => (
              <InfluencerCard key={inf.id} influencer={inf} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
