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
//   const { cookie } = req.headers;

//   // 권한이 있는 사용자라면...
//   if (cookie && req.headers.authorization) {
//     const { accessCookie, refreshCookie } = parseCookie(cookie);
//     const [access, refresh] = req.headers.authorization.split(",");

//     try {
//       if (req.method === "POST") {
//         if (req.body.type === "matching") {
//           const response = await request.post(
//             `${getBaseServerUrl()}/room/matching`,
//             {
//               ...req.body,
//               headers: {
//                 Authorization: `${access},${refresh}`,
//                 Cookie: `access=${accessCookie}; refresh=${refreshCookie}`,
//               },
//             },
//           );
//           return res.status(response.status).json(response.data);
//         }
//       }
//       if (req.method === "PATCH") {
//         if (req.body.type === "matchingCancel") {
//           const response = await request.patch(
//             `${getBaseServerUrl()}/room/matching`,
//             {
//               ...req.body,
//               headers: {
//                 Authorization: `${access},${refresh}`,
//                 Cookie: `access=${accessCookie}; refresh=${refreshCookie}`,
//               },
//             },
//           );
//           return res.status(response.status).json(response.data);
//         }
//       }

//       res.status(400).json({ message: "400 Next" });
//     } catch (e) {
//       res.status(500).json({ message: "500 Next" });
//     }
//   }

//   try {
//     if (req.method === "POST") {
//       if (req.body.type === "matching") {
//         const response = await request.post(
//           `${getBaseServerUrl()}/room/matching`,
//           req.body,
//         );
//         return res.status(response.status).json(response.data);
//       }
//     }
//     if (req.method === "PATCH") {
//       if (req.body.type === "matchingCancel") {
//         const response = await request.patch(
//           `${getBaseServerUrl()}/room/matching`,
//           req.body,
//         );
//         return res.status(response.status).json(response.data);
//       }
//     }

//     res.status(400).json({ message: "400 Next" });
//   } catch (e) {
//     res.status(500).json({ message: "500 Next" });
//   }
// }
