import { request, getBaseClientUrl, getBaseServerUrl } from "../../_lib/http";

// export const getUserInfo = async () => {
//   const access = window.localStorage.getItem("access");
//   const refresh = window.localStorage.getItem("refresh");
//   const res = await request.get(`${getBaseClientUrl()}/users`, {
//     headers: {
//       Cookie: `access=${access}; refresh=${refresh};`,
//       Authorization: `${access},${refresh}`,
//     },
//   });

//   return res;
// };

export const getUserInfo2 = async () => {
  const access = window.localStorage.getItem("access");
  const refresh = window.localStorage.getItem("refresh");

  const res = await request.get(`${getBaseServerUrl()}/users`, {
    headers: {
      Cookie: `access=${access}; refresh=${refresh};`,
      Authorization: `${access},${refresh}`,
    },
  });

  return res;
};

// export const getWalletInfo = async () => {
//   const access = window.localStorage.getItem("access");
//   const refresh = window.localStorage.getItem("refresh");

//   const res = await request.post(`${getBaseClientUrl()}/users`, {
//     type: "get",
//     headers: {
//       Cookie: `access=${access}; refresh=${refresh};`,
//       Authorization: `${access},${refresh}`,
//     },
//   });
//   return res;
// };

export const getWalletInfo2 = async () => {
  const access = window.localStorage.getItem("access");
  const refresh = window.localStorage.getItem("refresh");

  const res = await request.get(`${getBaseServerUrl()}/nft/wallet/info`, {
    headers: {
      Cookie: `access=${access}; refresh=${refresh};`,
      Authorization: `${access},${refresh}`,
    },
  });
  return res;
};

// export const makeWallet = async () => {
//   const res = await request.post(`${getBaseClientUrl()}/users`, {
//     type: "post",
//   });
//   return res;
// };

export const makeWallet2 = async () => {
  const access = window.localStorage.getItem("access");
  const refresh = window.localStorage.getItem("refresh");

  const res = await request.post(`${getBaseServerUrl()}/nft/wallet`, {
    Cookie: `access=${access}; refresh=${refresh};`,
    Authorization: `${access},${refresh}`,
  });
  return res;
};

export const getWallet = async () => {
  const access = window.localStorage.getItem("access");
  const refresh = window.localStorage.getItem("refresh");

  const res = await request.get(`${getBaseServerUrl()}/nft/wallet`, {
    headers: {
      Cookie: `access=${access}; refresh=${refresh};`,
      Authorization: `${access},${refresh}`,
    }
  });
  return res;
};

export const saveDefaultPiece = async (productName) => {
  const access = window.localStorage.getItem("access");
  const refresh = window.localStorage.getItem("refresh");
  
  const res = await request.post(`${getBaseServerUrl()}/users/piece`,{
    productName: productName  
  } ,{
    headers: {
      Cookie: `access=${access}; refresh=${refresh};`,
      Authorization: `${access},${refresh}`,
    }, 
    
  });
  return res;
};