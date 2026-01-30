import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Redirect based on role
      window.location.href = data.redirectTo;
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | InfluenceHub</title>
      </Head>

      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white">
              Welcome back
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Login to your InfluenceHub account
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-800 text-red-400 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

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
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-purple-400 hover:text-purple-500">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
