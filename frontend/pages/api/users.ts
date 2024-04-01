import type { NextApiRequest, NextApiResponse } from "next";
import { request, getBaseServerUrl } from "../../_lib/http";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    const { cookie } = req.headers;

    if (!cookie) {
      return res.status(401);
    }

    const cookies = cookie.split("; ");
    let accessCookie = "";
    let refreshCookie = "";

    for (const cookie of cookies) {
      const [key, value] = cookie.split("="); // 쿠키 문자열을 '=' 기준으로 분리하여 키와 값을 추출
      if (key === "access") {
        accessCookie = value;
      } else if (key === "refresh") {
        refreshCookie = value;
      }
    }

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

      const response = await request.get(`${getBaseServerUrl()}/users`, {
        headers: {
          Cookie: `access=${accessCookie}; refresh=${refreshCookie}`,
        },
      });

      return res.status(response.status).json(response.data);
    } else {
      if (req.body.type === "get") {
        const response = await request.get(`${getBaseServerUrl()}/nft/wallet`, {
          headers: {
            Cookie: `access=${accessCookie}; refresh=${refreshCookie}`,
          },
        });

        return res.status(response.status).json(response.data);
      } else if (req.body.type === "post") {
        const response = await request.post(
          `${getBaseServerUrl()}/nft/wallet`,
          {
            headers: {
              Cookie: `access=${accessCookie}; refresh=${refreshCookie}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(null), // JSON.stringify를 사용하여 본문을 문자열로 변환
          },
        );

        return res.status(response.status).json(response.data);
      }
    }

    res.status(400).json({ message: "400" });
  } catch (e) {
    res.status(400).json({ message: "400" });
  }
}
