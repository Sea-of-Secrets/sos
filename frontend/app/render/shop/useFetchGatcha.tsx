import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { GatchaType } from "~/app/auth/types";
import { useAuth } from "~/app/auth/useAuth";
import * as ShopsApi from "~/app/api/shops";
import * as UsersApi from "~/app/api/users";

interface RandomGatchaContextState {
  loading: boolean;
  randomGatcha: GatchaType | null;
  fetchRandomGatcha: () => void;
}

const RandomGatchaContext = createContext<RandomGatchaContextState>({
  loading: false,
  randomGatcha: null,
  fetchRandomGatcha: () => {},
});

export const RandomGatchaProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [randomGatcha, setRandomGatcha] = useState<GatchaType | null>(null);
  const { setUser, setNftList } = useAuth();

  const fetchRandomGatcha = useCallback(async () => {
    if (randomGatcha) {
      return;
    }
    mockGatcha().then(data => setRandomGatcha(data)); // 돈 계속 빠져나가서 만든 테스트용 함수

    // // TODO: 배포시에는 이걸 사용해주세용
    // ShopsApi.postGatcha()
    //   .then(res => setRandomGatchaData(res.data))
    //   .catch(e => {
    //     console.error("지갑없음!");
    //   });

    // // 가챠 뽑고 유저 데이터 업데이트
    // UsersApi.getUserInfo()
    //   .then(res => {
    //     if (validateUser(res.data)) {
    //       setUser(res.data);
    //     }
    //   })
    //   .catch(e => {
    //     console.error("fetch fail user");
    //   });

    // UsersApi.getWallet()
    //   .then(res => {
    //     if (validateNftListData(res.data)) {
    //       setNftList(res.data);
    //     }
    //   })
    //   .catch(e => console.error("fetch fail nftList"));

    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      loading,
      randomGatcha,
      fetchRandomGatcha,
    }),
    [loading, randomGatcha, fetchRandomGatcha],
  );

  return (
    <RandomGatchaContext.Provider value={value}>
      {children}
    </RandomGatchaContext.Provider>
  );
};

export const useRandomGatcha = () => {
  const context = useContext(RandomGatchaContext);

  if (!context) {
    throw new Error("RandomGatchaProvider 가 없음");
  }

  return context;
};

const MOCK_DATA: GatchaType = {
  name: "zuhee",
  grade: "LEGENDARY",
  hasItemAlready: true,
  imgUrl:
    "https://a710choi.s3.ap-northeast-2.amazonaws.com/f150b925-5f5c-4fe3-9676-3b6c9e41b536.png",
};

const mockGatcha = async (): Promise<GatchaType> => {
  // console.log("두근두근 가챠 타임 (테스트용)");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
      // console.log(MOCK_DATA);
    }, 5000);
  });
};
