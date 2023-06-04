import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { status, transactionId } = req.body;
    const { cookies } = req;
    const token = cookies.authToken;
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const result = await axios.patch(
        `${process.env.API_URL}/transaction/update`,
        {
          status: status,
          transactionId: transactionId,
        },
        config
      );
      return res.status(200).json(result.data);
    } catch (error: any) {
      return res.status(error.response.status).json(error.response.statusText);
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
