import type { NextApiRequest, NextApiResponse } from "next";
import { request, getBaseServerUrl } from "../../_lib/http";
import { parseCookie } from "~/_lib/utils";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { cookie } = req.headers;

  // 권한이 없다면 바로 컷
  if (!cookie) {
    return res.status(403).json({ message: "403 Next" });
  }

  const { accessCookie, refreshCookie } = parseCookie(cookie);

  const body = JSON.parse(req.body);

  try {
    if (req.method === "POST") {
      if (body.type === "RANDOM") {
        console.log(req.headers);

        const response = await request.post(
          `${getBaseServerUrl()}/products/random`,
          {
            headers: {
              Cookie: req.headers.cookie,
              Authorization: req.headers.authorization,
            },
          },
        );

        console.log(response);

        return res.status(response.status).json(response.data);
      }
    }

    res.status(400).json({ message: "400 Next" });
  } catch (e) {
    res.status(500).json({ message: "500 Next" });
  }
}
