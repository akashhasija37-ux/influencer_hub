import { useRouter } from "next/router";
import { useState, useEffect } from "react";



export default function VerifyEmailPage() {
  const router = useRouter();
 

  //console.log(email)

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

useEffect(() => {
  const storedEmail = localStorage.getItem("verifyEmail");
  setEmail(storedEmail);
}, []);

  const handleVerify = async () => {
    setLoading(true);
    setError(null);

    console.log(otp,email)

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    console.log(data)

    if (!res.ok) {
      setError(data.message || "Verification failed");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Verify Your Email
        </h1>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the 6-digit code sent to <br />
          <b>{email}</b>
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600">{error}</div>
        )}

        {success ? (
          <div className="text-green-600 text-center">
            Email verified successfully 🎉<br />
            Redirecting to login...
          </div>
        ) : (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full border px-4 py-3 rounded-lg mb-4 text-center tracking-widest text-lg"
              placeholder="123456"
            />

            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
