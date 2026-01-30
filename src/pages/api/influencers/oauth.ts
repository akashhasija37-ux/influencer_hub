import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  const params = new URLSearchParams({
    client_id: process.env.INSTAGRAM_CLIENT_ID!,
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
    response_type: "code",
    scope: "instagram_basic,pages_show_list,pages_read_engagement",
    state: String(username),
  });

  res.redirect(
    `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`
  );
}
