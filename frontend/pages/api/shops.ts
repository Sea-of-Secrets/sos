import type { NextApiRequest, NextApiResponse } from "next";
import { request, getBaseServerUrl } from "../../_lib/http";
import { parseCookie } from "~/_lib/utils";
import { cookies } from "next/headers";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { cookie } = req.headers;

  console.log("////////////  access  //////////////////////");
  console.log(cookies().get("access"));
  console.log("//////////////////////////////////");

  console.log("////////////  refresh  //////////////////////");
  console.log(cookies().get("refresh"));
  console.log("//////////////////////////////////");

  // 권한이 없다면 바로 컷
  if (!cookie) {
    return res.status(403).json({ message: "403 Next" });
  }
  // if (!cookie || !req.headers.authorization) {
  //   return res.status(403).json({ message: "403 Next" });
  // }

  const { accessCookie, refreshCookie } = parseCookie(cookie);
  //  const [access, refresh] = req.headers.authorization.split(",");

  try {
    if (req.method === "POST") {
      if (req.body.type === "RANDOM") {
        const response = await request.post(
          `${getBaseServerUrl()}/products/random`,
          {
            headers: {
              authentication: `access=${accessCookie}; refresh=${refreshCookie}`,
              // Authorization: `${access},${refresh}`,
              Cookie: `access=${accessCookie}; refresh=${refreshCookie}`,
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
