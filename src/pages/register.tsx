import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"INFLUENCER" | "BRAND">("INFLUENCER");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role, // ✅ BRAND | INFLUENCER
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // ✅ Redirect based on role (from backend or frontend logic)
      if (data.redirectTo) {
        router.push("/verify-email");
        localStorage.setItem("verifyEmail", email);
      } else {
        router.push("/verify-email");
        localStorage.setItem("verifyEmail", email);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register | InfluenceHub</title>
        <meta
          name="description"
          content="Create your InfluenceHub account as a brand or influencer"
        />
      </Head>

      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white">
              Create your account
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Join InfluenceHub as a Brand or Influencer
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-800 text-red-400 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="••••••••"
              />
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <p className="text-sm text-gray-400">Register as</p>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="INFLUENCER"
                  checked={role === "INFLUENCER"}
                  onChange={() => setRole("INFLUENCER")}
                  className="accent-purple-600"
                />
                <span className="text-white">Influencer</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="BRAND"
                  checked={role === "BRAND"}
                  onChange={() => setRole("BRAND")}
                  className="accent-purple-600"
                />
                <span className="text-white">Brand</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-400 hover:text-purple-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
