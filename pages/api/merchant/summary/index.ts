import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { merchantId } = req.query;
    const { cookies } = req;
    const token = cookies.authToken;

    try {
      const response = await axios.get(
        `${process.env.API_URL}/merchant/summary`,
        {
          params: { merchantId: merchantId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.status(response.status).json(response.data);
    } catch (err: any) {
      if (err.response) {
        return res
          .status(err.response.status)
          .json({ message: err.response.data });
      } else {
        return res.status(500).json({ message: err.message });
      }
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
