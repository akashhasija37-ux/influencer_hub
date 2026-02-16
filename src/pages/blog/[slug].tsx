import { useRouter } from "next/router";
import Head from "next/head";

type BlogPost = {
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
};

const blogDatabase: BlogPost[] = [
  {
    title: "How to Get Brand Deals as an Influencer",
    slug: "get-brand-deals-as-influencer",
    metaDescription:
      "Learn how to get brand deals, secure influencer brand deals, and land paid collaborations using brand collaboration websites.",
    content: `
      Getting brand deals as an influencer requires positioning, pitching, and proof of performance.

      1. Optimize your profile.
      2. Build a niche audience.
      3. Create a media kit.
      4. Pitch brands consistently.
      5. Use influencer collaboration websites.

      Influencer brand deals are easier when your engagement rate is strong and your audience is targeted.
    `,
  },
  {
    title: "How to Find Influencers for Your Brand",
    slug: "how-to-find-influencers",
    metaDescription:
      "Step-by-step guide to find influencers, evaluate engagement, and launch high-ROI influencer marketing campaigns.",
    content: `
      Finding influencers for your brand starts with audience alignment.

      - Use influencer discovery tools
      - Analyze engagement rate
      - Check audience authenticity
      - Review past brand collaborations
      - Track campaign ROI

      The right influencer drives conversions, not vanity metrics.
    `,
  },
];

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;

  const post = blogDatabase.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">Blog not found</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | InfluenceHub Blog</title>
        <meta name="description" content={post.metaDescription} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
      </Head>

      <div className="min-h-screen bg-black text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl font-extrabold mb-6">
            {post.title}
          </h1>

          <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-line">
            {post.content}
          </div>

        </div>
      </div>
    </>
  );
}
