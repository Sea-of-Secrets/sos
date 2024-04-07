import styled from "@emotion/styled";

import UserNft from "./UserNft";

import * as UsersApi from "../api/users";
import { useState } from "react";

import Container from "../render/components/Container";
import { useCamera } from "../render/stores/useCamera";
import { useScreenControl } from "../render/stores/useScreenControl";
import { useAuth, validateUser } from "~/app/auth/useAuth";
import MiniModalContent from "../render/components/MiniModalContent";
import MiniModal from "../render/components/MiniModal";
import { WalletType } from "../auth/types";
import UserProfile from "./UserProfile";

export default function Page() {
  const { user, setUser } = useAuth();
  const [copied, setCopied] = useState(false);
  const [menuTogle, setMenuTogle] = useState("ship");
  const [newAddressCopied, setNewAddressCopied] = useState(false);
  const [newMnemonicCopied, setNewMnemonicCopied] = useState(false);
  const [newPrivateKeyCopied, setNewPrivateKeysCopied] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [address, setAddress] = useState("");

  const { cameraRef, mainScreen, LoginScreen } = useCamera();
  const { screen, setScreen, setMainScreen } = useScreenControl();

  const handleMakeWallet = async () => {
    try {
      const walletResponse = await UsersApi.makeWallet();
      setWallet(walletResponse.data as WalletType);
    } catch (e) {
      console.error(e);
    }

    // 유저 정보 업데이트
    try {
      const { data: userData } = await UsersApi.getUserInfo();
      if (validateUser(userData)) {
        setUser(userData);
        return;
      }
      console.error("fetch fail user");
    } catch (e) {
      console.error("fetch fail user");
    }
  };

  // 주소를 클립보드에 복사합니다.
  const handleCopyAddress = () => {
    if (user && user.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress);
      setCopied(true);
    }
  };
  const handleCopyNewAddress = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.address);
      setNewAddressCopied(true);
    }
  };
  const handleCopyMnemonic = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.mnemonic);
      setNewMnemonicCopied(true);
    }
  };
  const handleCopyPrivateKey = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.privateKey);
      setNewPrivateKeysCopied(true);
    }
  };

  // 주소를 마스킹하는 함수
  const maskAddress = (address: string) => {
    if (!address) return "";
    const visibleChars = 12; // 보여질 문자열 길이
    const maskedPart = "..."; // 마스킹할 부분
    return address.slice(0, visibleChars) + maskedPart;
  };

  const handleGetWallet = async () => {
    setMenuTogle("wallet");
    const response = await UsersApi.getWalletInfo();
    setWallet(response.data as WalletType);
  };

  const handleLogout = async () => {
    try {
      await UsersApi.logout();
    } catch (e) {
    } finally {
      setUser(null);
      mainScreen();
      setScreen("MAIN");
    }
  };

  const handleAddWallet = async () => {
    try {
      const response = await UsersApi.addWallet(address);
      const updatedWallet = { address: address } as WalletType;
      setWallet(updatedWallet);
      if (response.status === 200) {
        window.alert("저장 성공");
      }
    } catch (e) {
      window.alert("올바른 지갑 주소를 입력해주세요");
    }
  };

  if (!user) {
    return <h1>유저가 없음... 로딩중일수도 있음...</h1>;
  }

  return (
    <>
      <Container position="right">
        <ModalStyle>
          <ModalContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p>
                <span className="text-xl">{user.name}</span> 님 안녕하세요!
              </p>
              {!user.walletAddress && (
                <div
                  className="gap-1"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Button onClick={handleMakeWallet} size={"xs"}>
                    지갑 생성
                  </Button>
                  <Button onClick={handleAddWallet} size={"xs"}>
                    지갑 연동
                  </Button>
                  <Button size={"xs"} onClick={handleLogout}>
                    로그아웃
                  </Button>
                </div>
              )}
              {user.walletAddress && (
                <div
                  className="gap-1"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Button
                    onClick={() => {
                      setMenuTogle("ship");
                    }}
                    size={"xs"}
                  >
                    배 NFT
                  </Button>
                  <Button onClick={handleGetWallet} size={"xs"}>
                    지갑 정보
                  </Button>
                  <Button size={"xs"} onClick={handleLogout}>
                    로그아웃
                  </Button>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginTop: "1rem",
                  width: "20rem",
                  height: "23rem",
                }}
              >
                {menuTogle === "ship" ? (
                  <UserNft />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      alignItems: "center",
                      flexDirection: "column",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <h1 className="text-xl">지갑 정보</h1>
                    <span className="text-sm mt-1">
                      Kaikas에 연동해서 모바일에서도 NFT를 확인해보세요!
                    </span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          position: "relative",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>
                          지갑 주소 : {maskAddress(wallet?.address as string)}
                        </span>
                        <Button
                          style={{
                            position: "absolute",
                            right: 0,
                          }}
                          onClick={handleCopyNewAddress}
                          size={"xs"}
                        >
                          {newAddressCopied ? "복사됨!" : "복사하기"}
                        </Button>
                      </div>
                      {wallet?.privateKey && (
                        <div
                          style={{
                            display: "flex",
                            position: "relative",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <span>
                            개인키 : {maskAddress(wallet?.privateKey as string)}
                          </span>
                          <Button
                            style={{
                              position: "absolute",
                              right: 0,
                            }}
                            onClick={handleCopyPrivateKey}
                            size={"xs"}
                          >
                            {newPrivateKeyCopied ? "복사됨!" : "복사하기"}
                          </Button>
                        </div>
                      )}
                      {wallet?.mnemonic && (
                        <div>
                          <span>연상 기호 :{wallet?.mnemonic}</span>
                        </div>
                      )}
                      <div
                        style={{
                          display: "flex",
                          position: "relative",
                          alignItems: "center",
                          width: "100%",
                          gap: "0.3rem",
                        }}
                      >
                        <span>지갑 수정 : </span>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                          className="text-center block w-36 h-7 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="변경할 지갑 주소"
                        />
                        <Button
                          style={{
                            position: "absolute",
                            right: 0,
                          }}
                          onClick={handleAddWallet}
                          size={"xs"}
                        >
                          수정하기
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ModalContent>
        </ModalStyle>
      </Container>
    </>
  );
}

const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;
  height: 40rem;
  padding: 1rem;
  background: url("/assets/modal-background.png") no-repeat center center;
  background-size: cover;
  z-index: 999;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 29rem;
  padding: 5rem;
`;

const Button = styled.button<{ size?: "xs" | "md" | "sm" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: url("/assets/text-background.png") no-repeat center center;
  background-size: cover;
  font-size: ${({ size }) => {
    switch (size) {
      case "xs":
        return "14px";
      case "sm":
        return "20px";
      default:
        return "40px";
    }
  }};
  color: #fff;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.1);
  }

  ${({ size }) => {
    switch (size) {
      case "xs":
        return `
          width: 6rem;
          height: 3rem;
        `;
      case "sm":
        return `
          width: 8rem;
          height: 3rem;
        `;
      default:
        return `
          width: 22rem;
          height: 8rem;
        `;
    }
  }}
`;
