// import type { NextApiRequest, NextApiResponse } from "next";
// import { request, getBaseServerUrl } from "../../_lib/http";
// import { parseCookie } from "~/_lib/utils";

// type ResponseData = {
//   message: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>,
// ) {
//   try {
//     const { cookie } = req.headers;

//     if (!cookie) {
//       return res.status(401).json({ message: "쿠키가 없음" });
//     }

//     const { accessCookie, refreshCookie } = parseCookie(cookie);

//     if (!req.headers.authorization) {
//       return res.status(401).json({ message: "권한이 없음" });
//     }

//     const [access, refresh] = req.headers.authorization.split(",");

//     if (!access || !refresh) {
//       return res.status(400).json({ message: "토큰 2개 보내라" });
//     }

//     if (req.method === "GET") {
//       const response = await request.get(`${getBaseServerUrl()}/users`, {
//         headers: {
//           Authorization: `${access},${refresh}`,
//           Cookie: `access=${access}; refresh=${refresh}`,
//         },
//       });

//       return res.status(response.status).json(response.data);
//     } else {
//       if (req.body.type === "get") {
//         const response = await request.get(`${getBaseServerUrl()}/nft/wallet`, {
//           headers: {
//             Authorization: `${access},${refresh}`,
//             Cookie: `access=${access}; refresh=${refresh}`,
//           },
//         });

//         return res.status(response.status).json(response.data);
//       } else if (req.body.type === "post") {
//         const response = await request.post(
//           `${getBaseServerUrl()}/nft/wallet`,
//           {
//             headers: {
//               Authorization: `${access},${refresh}`,
//               Cookie: `access=${accessCookie}; refresh=${refreshCookie}`,
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(null), // JSON.stringify를 사용하여 본문을 문자열로 변환
//           },
//         );

//         return res.status(response.status).json(response.data);
//       }
//     }

//     res.status(400).json({ message: "400" });
//   } catch (e) {
//     res.status(400).json({ message: "400" });
//   }
// }
