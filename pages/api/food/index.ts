import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { merchantId, foods } = req.body;
    const { cookies } = req;
    const token = cookies.authToken;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.post(
        `${process.env.API_URL}/food/create`,
        {
          merchantId: merchantId,
          foods: foods,
        },
        config
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
