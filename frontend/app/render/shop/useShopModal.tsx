import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { GatchaType } from "~/app/auth/types";

interface ShopModalContextState {
  isOpenedModal: boolean;
  randomGatcha: GatchaType | null;
  toggleModal: () => void;
  setRandomGatcha: (gatcha: GatchaType) => void;
}

const ShopModalContext = createContext<ShopModalContextState>({
  isOpenedModal: false,
  randomGatcha: null,
  toggleModal: () => {},
  setRandomGatcha: () => {},
});

export const ShopModalProvier = ({ children }: PropsWithChildren) => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [randomGatcha, _setRandomGatcha] = useState<GatchaType | null>(null);

  const toggleModal = useCallback(() => {
    setIsOpenedModal(prev => !prev);
  }, []);

  const setRandomGatcha = useCallback(async (gatcha: GatchaType) => {}, []);

  const value = useMemo(
    () => ({
      isOpenedModal,
      randomGatcha,
      setRandomGatcha,
      toggleModal,
    }),
    [isOpenedModal, randomGatcha, setRandomGatcha, toggleModal],
  );

  return (
    <ShopModalContext.Provider value={value}>
      {children}
    </ShopModalContext.Provider>
  );
};

export const useShopModal = () => {
  const context = useContext(ShopModalContext);

  if (!context) {
    throw new Error("ShopModalProvier 가 없음");
  }

  return context;
};
