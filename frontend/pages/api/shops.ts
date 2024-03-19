import type { NextApiRequest, NextApiResponse } from "next";
import { http } from "../http";

type ResponseData = {
  message: string;
};

// 타입 어떻게 하지?
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    if (req.method === "GET") {
      const response = await http.get("/shops");
      return res.status(response.status).json(response.data);
    }

    res.status(400).json({ message: "400" });
  } catch (e) {
    res.status(400).json({ message: "400" });
  }
}
