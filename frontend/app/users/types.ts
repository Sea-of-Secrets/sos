export type UserModel = {
  id: number;
  name: string;
  email: string;
  role: string;
  username: string;
  walletAddress: string | null;
  gold: number | null;
  productId: number | string | null;
};

export type NFTModel = {
  name: string;
  description: string | null;
  image: string | null;
};

export type WalletModel = {
  address: string;
  mnemonic: string;
  privateKey: string;
};
