import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { parse } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.auth_token;

    if (!token) {
      return res.status(401).json({ user: null });
    }

    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ user: null });
    }

    return res.status(200).json({ user });
  } catch {
    return res.status(401).json({ user: null });
  }
}
