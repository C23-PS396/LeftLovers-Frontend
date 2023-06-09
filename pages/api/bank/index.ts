import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const result = await axios.get(`${process.env.API_URL}/bank`);
      return res.status(200).json(result.data);
    } catch (error: any) {
      return res.status(error.response.status).json(error.response.statusText);
    }
  } else if (req.method === "POST") {
    let { sellerId, accounts } = req.body;
    accounts[0]["swiftCode"] = accounts[0].swift_code;
    delete accounts[0].swift_code;
    const { cookies } = req;
    const token = cookies.authToken;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.post(
        `${process.env.API_URL}/bank`,
        {
          sellerId: sellerId,
          accounts: accounts,
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
