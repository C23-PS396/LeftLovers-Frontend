import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const result = await axios.get(`${process.env.API_URL}/food/category`);
      return res.status(200).json(result.data);
    } catch (error: any) {
      return res.status(error.response.status).json(error.response.statusText);
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
