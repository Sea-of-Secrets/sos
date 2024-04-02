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
      if (req.body.type === "matching") {
        const response = await request.post(
          `${getBaseServerUrl()}/room/matching`,
          req.body,
        );
        return res.status(response.status).json(response.data);
      }
    }
    if (req.method === "PATCH") {
      if (req.body.type === "matchingCancel") {
        const response = await request.patch(
          `${getBaseServerUrl()}/room/matching`,
          req.body,
        );
        return res.status(response.status).json(response.data);
      }
    }

    res.status(400).json({ message: "400" });
  } catch (e) {
    res.status(400).json({ message: "400" });
  }
}
