import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const token = serialize("authToken", "", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", token);
    return res.status(200).json({ message: "Successfully logged out." });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
