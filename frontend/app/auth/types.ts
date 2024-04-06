export type User = {
  id: number;
  email: string;
  gold: number | null;
  name: string;
  productName: string | null;
  role: string;
  username: string;
  walletAddress: string | null;
};

export type NFTType = {
  name: string;
  description: string | null;
  image: string | null;
};

export type WalletType = {
  address: string;
  mnemonic: string;
  privateKey: string;
};

export const UserTypeKeys: (keyof User)[] = [
  "email",
  "gold",
  "id",
  "name",
  "productName",
  "role",
  "username",
  "walletAddress",
];
