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
      const result = await axios.get(`${process.env.API_URL}/review`, {
        params: {
            merchantId: merchantId,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.status(200).json(result.data);
    } catch (error: any) {
      return res.status(error.response.status).json(error.response.statusText);
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
