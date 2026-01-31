import { useRouter } from "next/router";
import { useState } from "react";

export default function ConnectPlatform() {
  const { query, push } = useRouter();
  const [username, setUsername] = useState("");
  const platform = query.platform as string;
  const campaignId = query.cid;

  const connect = async () => {
    await fetch(`/api/connect/${platform}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, campaignId }),
    });

    push("/influencer/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md border border-gray-800">
        <h2 className="text-xl font-bold mb-4 capitalize">
          Connect {platform}
        </h2>

        <input
          placeholder={`${platform} username`}
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full bg-black border border-gray-700 p-3 rounded-lg mb-4"
        />

        <button
          onClick={connect}
          className="w-full bg-purple-600 py-3 rounded-lg font-semibold"
        >
          Connect & Apply
        </button>
      </div>
    </div>
  );
}
