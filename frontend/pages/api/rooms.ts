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
    if (req.method === "POST") {
      if (req.body.type === "make") {
        const response = await request.post(
          `${getBaseServerUrl()}/room/make`,
          req.body,
        );
        return res.status(response.status).json(response.data);
      }

      if (req.body.type === "enter") {
        const response = await request.post(
          `${getBaseServerUrl()}/room/enter`,
          req.body,
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

    res.status(400).json({ message: "400" });
  } catch (e) {
    res.status(400).json({ message: "400" });
  }
}
