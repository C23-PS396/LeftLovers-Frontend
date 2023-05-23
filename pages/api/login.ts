import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize } from "cookie";
import { GetPublicKeyOrSecret, Secret, verify } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { credential, password } = req.body;
    try {
      const response = await axios.post(
        `${process.env.API_URL}/auth/seller/signin`,
        {
          credential: credential,
          password: password,
        }
      );

      if (response.status === 200) {
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
  } else if (req.method === "GET") {
    const { cookies } = req;
    const token = cookies.authToken;
    res.setHeader("Cache-Control", "no-store");
    if (token) {
      try {
        verify(token, process.env.SECRET as Secret | GetPublicKeyOrSecret);
      } catch {
        return res.status(200).json({ message: "TOKEN_UNVERIFIED" });
      }
      return res.status(200).json({ message: token });
    } else {
      return res.status(200).json({ message: "TOKEN_DOES_NOT_EXIST" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
