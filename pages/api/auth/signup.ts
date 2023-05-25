import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { fullname, email, password, username } = req.body;
    try {
      const response = await axios.post(
        `${process.env.API_URL}/auth/seller/signup`,
        {
          fullname: fullname,
          email: email,
          password: password,
          username: username,
        }
      );

      if (response.status === 201) {
        const token = serialize("authToken", response.data.token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
          path: "/",
        });

        res.setHeader("Set-Cookie", token);
      }

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
