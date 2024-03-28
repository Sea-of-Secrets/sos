import type { NextApiRequest, NextApiResponse } from "next";
import { http } from "../../_lib/http";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    if (req.method === "GET") {
        const response = await http.get("/users");
        console.log("hi");
        console.log(response)
        return res.status(response.status).json(response.data);
    }

    res.status(400).json({ message: "400" });
  } catch (e) {
    res.status(400).json({ message: "400" });
  }
}
