import type { NextApiRequest, NextApiResponse } from "next";
import { request, getBaseServerUrl } from "../../_lib/http";

type ResponseData = {
  message: string;
};

// 타입 어떻게 하지?
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // 다른 CORS 관련 헤더를 설정할 수도 있습니다.
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    if (req.method === "GET") {
      const response = await request.get(`${getBaseServerUrl()}/shops`);
      return res.status(response.status).json(response.data);
    }

    res.status(400).json({ message: "400" });
  } catch (e) {
    res.status(400).json({ message: "400" });
  }
}
