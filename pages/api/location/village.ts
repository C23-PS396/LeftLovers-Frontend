import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { districtId } = req.body;
    try {
      const result = await axios.get(
        `${process.env.API_URL}/location/village`,
        {
          params: {
            district_id: districtId,
          },
        }
      );
      return res.status(200).json(result.data);
    } catch (error: any) {
      return res.status(error.response.status).json(error.response.statusText);
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
