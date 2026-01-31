import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CampaignDetails() {
  const { query, push } = useRouter();
  const [campaign, setCampaign] = useState<any>(null);

  useEffect(() => {
    
    fetch(`/api/admin/campaigns`)
      .then(res => res.json()
    )
      .then(setCampaign);
      console.log(campaign)
  }, []);

  if (!campaign) return null;

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{campaign.title}</h1>
      <p className="text-gray-400 mt-2">{campaign.brand}</p>

      {/* Eligibility */}
      <div className="mt-6 bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h3 className="font-semibold mb-2">Eligibility</h3>
        <ul className="list-disc ml-5 text-sm text-gray-400">
          <li>Min Followers: {campaign.minFollowers}</li>
          <li>Min Engagement: {campaign.minEngagement}%</li>
        </ul>
      </div>

      {/* Deliverables */}
      <div className="mt-6 bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h3 className="font-semibold mb-2">Deliverables</h3>
        <p className="text-sm text-gray-400">{campaign.deliverables}</p>
      </div>

      <button
        onClick={() =>
          push(`/influencer/connect/${campaign.platform.toLowerCase()}?cid=${campaign.id}`)
        }
        className="mt-8 w-full bg-purple-600 py-3 rounded-xl font-semibold"
      >
        Apply & Connect {campaign.platform}
      </button>
    </div>
  );
}
