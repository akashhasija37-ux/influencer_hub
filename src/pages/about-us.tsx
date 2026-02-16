import Head from "next/head";
import { Target, ShieldCheck, Users, BarChart3, Globe, Zap } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About InfluenceHub | Influencer Marketing Platform</title>
        <meta
          name="description"
          content="Learn about InfluenceHub – the influencer discovery platform helping brands hire authentic creators and helping influencers get paid collaborations worldwide."
        />
        <meta
          name="keywords"
          content="about influencer marketing platform, influencer discovery platform, hire influencers, influencer brand deals, fake follower detection"
        />
      </Head>

      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">

        {/* ================= HERO ================= */}
        <section className="py-20 px-6 text-center bg-gradient-to-b from-purple-50 to-white dark:from-[#0b1220] dark:to-black">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
              <Target className="w-4 h-4 mr-2" />
              Influencer Discovery Platform
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Connecting Brands & Creators Globally
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              InfluenceHub helps brands hire authentic influencers and helps creators
              unlock paid collaborations, sponsorships, and brand deals — all in one platform.
            </p>
          </div>
        </section>

        {/* ================= OUR STORY ================= */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why We Built InfluenceHub
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Influencer marketing was broken. Brands struggled to find real influencers.
                Creators struggled to get paid fairly. Fake followers were everywhere.
                Negotiations happened in DMs. Payments were delayed.
              </p>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We built InfluenceHub to create transparency in influencer marketing —
                with real analytics, fraud detection, verified creators, and secure payments.
                Whether you're a startup hiring micro-influencers or a creator seeking
                brand deals, our platform simplifies everything.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: "Fraud Detection", desc: "AI-powered fake follower analysis" },
                { icon: Users, title: "Verified Creators", desc: "Authentic influencer database" },
                { icon: BarChart3, title: "Real Analytics", desc: "Track ROI & campaign metrics" },
                { icon: Globe, title: "Global Reach", desc: "Brands & creators worldwide" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0b1220] hover:shadow-lg transition"
                >
                  <item.icon className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-4" />
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="py-20 px-6 bg-gray-100 dark:bg-[#0b1220]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">

            {[
              { value: "500K+", label: "Verified Influencers" },
              { value: "10K+", label: "Brands Hiring" },
              { value: "$2B+", label: "Campaigns Managed" },
              { value: "5x ROI", label: "Average Campaign Return" },
            ].map((stat, i) => (
              <div key={i}>
                <h3 className="text-4xl font-extrabold text-purple-600 dark:text-purple-400">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <Zap className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-6" />

            <h2 className="text-3xl font-bold mb-6">
              Our Mission
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              To build the most transparent, data-driven influencer ecosystem
              where brands confidently hire influencers and creators monetize
              their audience fairly — without middlemen exploitation or fake metrics.
            </p>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Grow With InfluenceHub?
            </h2>

            <p className="mb-8 text-purple-100">
              Join thousands of brands and creators using our influencer
              discovery platform to grow faster.
            </p>

            <div className="flex justify-center gap-6">
              <Link href="/register">
                <button className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition">
                  Get Started
                </button>
              </Link>

              <Link href="/for-brands">
                <button className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-purple-700 transition">
                  Hire Influencers
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
