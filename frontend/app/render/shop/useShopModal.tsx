import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface ShopModalContextState {
  isOpenedModal: boolean;
  toggleModal: () => void;
}

const ShopModalContext = createContext<ShopModalContextState>({
  isOpenedModal: false,
  toggleModal: () => {},
});

export const ShopModalProvider = ({ children }: PropsWithChildren) => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const toggleModal = useCallback(() => {
    setIsOpenedModal(prev => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isOpenedModal,
      toggleModal,
    }),
    [isOpenedModal, toggleModal],
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
