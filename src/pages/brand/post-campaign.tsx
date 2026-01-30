import Head from "next/head";
import { useState } from "react";
import {
  ChevronDown,
  Calendar,
  Send,
  Save,
  Instagram,
  Youtube,
  Music2,
  Twitter,
  Linkedin,
  Facebook,
  AtSign,
} from "lucide-react";

/* ---------------- PLATFORM ICONS ---------------- */

const PLATFORMS = {
  Instagram: <Instagram className="w-5 h-5 text-pink-500" />,
  YouTube: <Youtube className="w-5 h-5 text-red-500" />,
  TikTok: <Music2 className="w-5 h-5 text-black" />,
  Twitter: <Twitter className="w-5 h-5 text-sky-500" />,
  LinkedIn: <Linkedin className="w-5 h-5 text-blue-600" />,
  Facebook: <Facebook className="w-5 h-5 text-blue-500" />,
  Threads: <AtSign className="w-5 h-5 text-gray-800" />,
} as const;

type PlatformKey = keyof typeof PLATFORMS;

/* ---------------- PLATFORM CHECKBOX ---------------- */

type CheckboxProps = {
  platform: keyof typeof PLATFORMS;
  checked: boolean;
  onChange: (platform: keyof typeof PLATFORMS) => void;
};

const PlatformCheckbox = ({ platform, checked, onChange }: CheckboxProps) => {
  return (
    <label className="flex items-center p-4 border rounded-lg cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(platform)}
        className="h-5 w-5 text-purple-600"
      />
      <span className="ml-4 flex items-center gap-2">
        {PLATFORMS[platform]}
        <span>{platform}</span>
      </span>
    </label>
  );
};


/* ---------------- MAIN PAGE ---------------- */

export default function PostCampaignPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    niche: "",
    budget: "",
    deliverables: "",
    deadline: "",
    platforms: [] as PlatformKey[],
  });

  /* ---------- PLATFORM TOGGLE ---------- */
  const togglePlatform = (platform: PlatformKey) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  /* ---------- SUBMIT ---------- */
  const submitCampaign = async (status: "DRAFT" | "PUBLISHED") => {
    if (!form.title || !form.description) {
      alert("Title and description are required");
      return;
    }

    const payload = {
      ...form,
      status,
      platforms: form.platforms.map((p) => p.toUpperCase()),
    };

    const res = await fetch("/api/campaigns/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Campaign saved successfully");
    } else {
      alert("Failed to create campaign");
    }
  };

  return (
    <>
      <Head>
        <title>Create New Campaign - Influencer Hub</title>
      </Head>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg border">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create New Campaign
        </h1>
        <p className="text-gray-500 mb-8">
          Fill in the details to post a new influencer campaign
        </p>

        <div className="space-y-6">
          {/* TITLE */}
          <input
            className="w-full border p-3 rounded"
            placeholder="Campaign title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* DESCRIPTION */}
          <textarea
            rows={4}
            className="w-full border p-3 rounded"
            placeholder="Campaign objective"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* PLATFORMS */}
          <div className="grid md:grid-cols-2 gap-4">
            {(Object.keys(PLATFORMS) as PlatformKey[]).map((p) => (
              <PlatformCheckbox
                key={p}
                platform={p}
                checked={form.platforms.includes(p)}
                onChange={togglePlatform}
              />
            ))}
          </div>

          {/* NICHE & BUDGET */}
          <div className="grid md:grid-cols-2 gap-4">
            <select
              className="border p-3 rounded"
              value={form.niche}
              onChange={(e) => setForm({ ...form, niche: e.target.value })}
            >
              <option value="">Select niche</option>
              <option>Fashion</option>
              <option>Beauty</option>
              <option>Tech</option>
              <option>Fitness</option>
              <option>Food</option>
              <option>Travel</option>
            </select>

            <select
              className="border p-3 rounded"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
            >
              <option value="">Select budget</option>
              <option>$100 - $500</option>
              <option>$500 - $1,000</option>
              <option>$1,000 - $5,000</option>
              <option>$5,000+</option>
            </select>
          </div>

          {/* DELIVERABLES */}
          <textarea
            rows={4}
            className="w-full border p-3 rounded"
            placeholder="Campaign deliverables"
            value={form.deliverables}
            onChange={(e) =>
              setForm({ ...form, deliverables: e.target.value })
            }
          />

          {/* DEADLINE */}
          <input
            type="date"
            className="border p-3 rounded w-full"
            value={form.deadline}
            onChange={(e) =>
              setForm({ ...form, deadline: e.target.value })
            }
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              onClick={() => submitCampaign("DRAFT")}
              className="border px-5 py-2 rounded flex items-center gap-2"
            >
              <Save size={16} /> Save Draft
            </button>

            <button
              onClick={() => submitCampaign("PUBLISHED")}
              className="bg-purple-600 text-white px-5 py-2 rounded flex items-center gap-2"
            >
              <Send size={16} /> Publish Campaign
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
