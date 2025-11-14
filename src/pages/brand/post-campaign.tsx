import Head from 'next/head';
import { ChevronDown, Calendar, Send, Save } from 'lucide-react';

// --- PlatformCheckbox component is now defined inside this file ---
const platformIcons: { [key: string]: string } = {
  Instagram: '📷',
  YouTube: '▶️',
  TikTok: '🎵',
  Twitter: '🐦', // Using Twitter icon for simplicity
  LinkedIn: '🔗',
  Facebook: '👍',
  Threads: '🌀',
};

type CheckboxProps = {
  platform: string;
};

const PlatformCheckbox = ({ platform }: CheckboxProps) => {
  const icon = platformIcons[platform] || '❓';

  return (
    <label
      htmlFor={platform}
      className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
    >
      <input
        type="checkbox"
        id={platform}
        className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
      />
      <span className="ml-4 flex items-center">
        <span className="text-xl mr-2">{icon}</span>
        <span className="font-medium text-gray-800">{platform}</span>
      </span>
    </label>
  );
};
// --- End of internal component ---


export default function PostCampaignPage() {
  return (
    <>
      <Head>
        <title>Create New Campaign - Influencer Hub</title>
      </Head>

      {/* Main form container */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Campaign
          </h1>
          <p className="text-gray-500 mt-1">
            Fill in the details to post a new influencer campaign
          </p>
        </div>

        <form className="space-y-6">
          {/* Campaign Title */}
          <div>
            <label
              htmlFor="campaign-title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Campaign Title
            </label>
            <input
              type="text"
              id="campaign-title"
              placeholder="e.g., Summer Fashion Collection Launch"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description / Objective */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Description / Objective
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Describe your campaign goals, target audience, and key messaging..."
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* Select Platforms */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Select Platforms
              </label>
              <button
                type="button"
                className="text-sm font-medium text-purple-600 hover:text-purple-800"
              >
                Select All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PlatformCheckbox platform="Instagram" />
              <PlatformCheckbox platform="YouTube" />
              <PlatformCheckbox platform="TikTok" />
              <PlatformCheckbox platform="LinkedIn" />
              <PlatformCheckbox platform="Twitter" />
              <PlatformCheckbox platform="Facebook" />
              <PlatformCheckbox platform="Threads" />
            </div>
          </div>

          {/* Niche & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="niche"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Niche / Category
              </label>
              <div className="relative">
                <select
                  id="niche"
                  className="w-full appearance-none rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option>Select niche</option>
                  <option>Fashion</option>
                  <option>Beauty</option>
                  <option>Tech</option>
                  <option>Fitness</option>
                  <option>Food</option>
                  <option>Travel</option>
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Budget Range
              </label>
              <div className="relative">
                <select
                  id="budget"
                  className="w-full appearance-none rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option>Select budget</option>
                  <option>$100 - $500</option>
                  <option>$500 - $1,000</option>
                  <option>$1,000 - $5,000</option>
                  <option>$5,000+</option>
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Requirements & Deliverables */}
          <div>
            <label
              htmlFor="deliverables"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Campaign Requirements & Deliverables
            </label>
            <textarea
              id="deliverables"
              rows={4}
              placeholder="Describe what you need from influencers (e.g., 3 Instagram Reels, 5 Stories, product reviews, etc.)"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* Deadline */}
          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Deadline
            </label>
            <div className="relative">
              <input
                type="text"
                id="deadline"
                placeholder="Pick a date"
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
              />
              <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 mt-8">
            <button
              type="button"
              className="flex items-center bg-white border border-gray-300 rounded-lg px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save as Draft
            </button>
            <button
              type="submit"
              className="flex items-center bg-purple-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-purple-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Publish Campaign
            </button>
          </div>
        </form>
      </div>
    </>
  );
}