import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return res.status(200);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
