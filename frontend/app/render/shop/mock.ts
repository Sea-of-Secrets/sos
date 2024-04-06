import { GatchaType } from "~/app/auth/types";

export const MOCK_DATA: GatchaType = {
  name: "zuhee",
  grade: "LEGENDARY",
  hasItemAlready: true,
  imgUrl:
    "https://a710choi.s3.ap-northeast-2.amazonaws.com/f150b925-5f5c-4fe3-9676-3b6c9e41b536.png",
};

export const mockGatcha = async (): Promise<GatchaType> => {
  // console.log("두근두근 가챠 타임 (테스트용)");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
      // console.log(MOCK_DATA);
    }, 3000);
  });
};
