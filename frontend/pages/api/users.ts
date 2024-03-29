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
      const cookies: any = req.headers.cookie?.split("; ");
      let accessCookie;
      let refreshCookie;

      for (const cookie of cookies) {
        const [key, value] = cookie.split("="); // 쿠키 문자열을 '=' 기준으로 분리하여 키와 값을 추출
        if (key === "access") {
          accessCookie = value;
        } else if (key === "refresh") {
          refreshCookie = value;
        }
      }

      const response = await http.get("/users", {
        headers: {
          Cookie: `access=${accessCookie}; refresh=${refreshCookie}`,
        },
      });

      return res.status(response.status).json(response.data);
    }

    res.status(400).json({ message: "400" });
  } catch (e) {
    res.status(400).json({ message: "400" });
  }
}
