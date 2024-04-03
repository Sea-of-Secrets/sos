import { getAccessToken, getRefreshToken, removeToken } from "~/store/auth";
import { request, getBaseServerUrl } from "../../_lib/http";

// export const getUserInfo = async () => {
//   const access = getAccessToken();
//   const refresh = getRefreshToken();
//   const res = await request.get(`${getBaseClientUrl()}/users`, {
//     headers: {
//       Cookie: `access=${access}; refresh=${refresh};`,
//       Authorization: `${access},${refresh}`,
//     },
//   });

//   return res;
// };

export const getUserInfo2 = async () => {
  const access = getAccessToken();
  const refresh = getRefreshToken();

  const res = await request.get(`${getBaseServerUrl()}/users`, {
    headers: {
      //Cookie: `access=${access}; refresh=${refresh};`,
      Authorization: `Bearer ${access}`,
    },
  });

  return res;
};

// export const getWalletInfo = async () => {
//   const access = getAccessToken();
//   const refresh = getRefreshToken();

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
  const access = getAccessToken();
  const refresh = getRefreshToken();

  const res = await request.get(`${getBaseServerUrl()}/nft/wallet/info`, {
    headers: {
      //Cookie: `access=${access}; refresh=${refresh};`,
      Authorization: `Bearer ${access}`,
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
  const access = getAccessToken();
  const refresh = getRefreshToken();

  const res = await request.post(`${getBaseServerUrl()}/nft/wallet`, {
    //Cookie: `access=${access}; refresh=${refresh};`,
    Authorization: `Bearer ${access}`,
  });
  return res;
};

export const getWallet = async () => {
  const access = getAccessToken();
  const refresh = getRefreshToken();

  const res = await request.get(`${getBaseServerUrl()}/nft/wallet`, {
    headers: {
      //Cookie: `access=${access}; refresh=${refresh};`,
      Authorization: `Bearer ${access}`,
    },
  });
  return res;
};

export const saveDefaultPiece = async (productName: string) => {
  const access = getAccessToken();
  const refresh = getRefreshToken();

  const res = await request.post(
    `${getBaseServerUrl()}/users/piece`,
    {
      productName: productName,
    },
    {
      headers: {
        // Cookie: `access=${access}; refresh=${refresh};`,
        Authorization: `Bearer ${access}`,
      },
    },
  );
  return res;
};

export const logout = async () => {
  const access = getAccessToken();
  const refresh = getRefreshToken();
  removeToken();

  const res = await request.post(`${getBaseServerUrl()}/logout`, {
    headers: {
      //Cookie: `access=${access}; refresh=${refresh};`,
      Authorization: `Bearer ${access}`,
    },
  });
  return res;
};

export const addWallet = async (address: string) => {
  const access = getAccessToken();
  const refresh = getRefreshToken();
  removeToken();

  const res = await request.patch(
    `${getBaseServerUrl()}/nft/wallet`,
    {
      walletAddress: address,
    },
    {
      headers: {
        //Cookie: `access=${access}; refresh=${refresh};`,
        Authorization: `Bearer ${access}`,
      },
    },
  );
  return res;
};
