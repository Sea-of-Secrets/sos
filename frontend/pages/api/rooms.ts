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

  // 권한이 있는 사용자라면...
  if (cookie && req.headers.authorization) {
    const { accessCookie, refreshCookie } = parseCookie(cookie);
    const [access, refresh] = req.headers.authorization.split(",");

    try {
      if (req.method === "POST") {
        if (req.body.type === "make") {
          const response = await request.post(
            `${getBaseServerUrl()}/room/make`,
            {
              ...req.body,
              headers: {
                Authorization: `${access},${refresh}`,
                Cookie: `access=${accessCookie}; refresh=${refreshCookie}`,
              },
            },
          );
          return res.status(response.status).json(response.data);
        }

        if (req.body.type === "enter") {
          const response = await request.post(
            `${getBaseServerUrl()}/room/enter`,
            {
              ...req.body,
              headers: {
                Authorization: `${access},${refresh}`,
                Cookie: `access=${accessCookie}; refresh=${refreshCookie}`,
              },
            },
          );
          return res.status(response.status).json(response.data);
        }

        if (req.body.type === "duplicateNickname") {
          const response = await request.get(
            `${getBaseServerUrl()}/users/name`,
            {
              params: { name: req.body.nickname },
              headers: {
                Authorization: `${access},${refresh}`,
                Cookie: `access=${accessCookie}; refresh=${refreshCookie}`,
              },
            },
          );

          return res.status(response.status).json(response.data);
        }
      }

      res.status(400).json({ message: "400 Next" });
    } catch (e) {
      res.status(500).json({ message: "500 Next" });
    }
  }

  // 권한이 없다면..
  try {
    if (req.method === "POST") {
      console.log(req.body);
      if (req.body.type === "make") {
        const response = await request.post(`${getBaseServerUrl()}/room/make`, {
          ...req.body,
        });
        return res.status(response.status).json(response.data);
      }

      if (req.body.type === "enter") {
        const response = await request.post(
          `${getBaseServerUrl()}/room/enter`,
          {
            ...req.body,
          },
        );
        return res.status(response.status).json(response.data);
      }

      if (req.body.type === "duplicateNickname") {
        const response = await request.get(`${getBaseServerUrl()}/users/name`, {
          params: { name: req.body.nickname },
        });

        return res.status(response.status).json(response.data);
      }
    }

    res.status(400).json({ message: "400 Next" });
  } catch (e) {
    res.status(500).json({ message: "500 Next" });
  }
}
