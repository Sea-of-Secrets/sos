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

export default function Page() {
  const { user, setUser } = useAuth();
  const [copied, setCopied] = useState(false);
  const [newAddressCopied, setNewAddressCopied] = useState(false);
  const [newMnemonicCopied, setNewMnemonicCopied] = useState(false);
  const [newPrivateKeyCopied, setNewPrivateKeysCopied] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [wallet, setWallet] = useState<WalletType | null>(null);

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

  const handleCloseWallet = () => {
    setWallet(null);
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
    const visibleChars = 6; // 보여질 문자열 길이
    const maskedPart = "..."; // 마스킹할 부분
    return address.slice(0, visibleChars) + maskedPart;
  };

  const handleGetWallet = async () => {
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
    const address = window.prompt("지갑 주소를 입력하세요:") as string;

    if (!address) {
      return;
    }

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
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <h2>{user.name}님 안녕하세요!</h2>
                    <Button size={"xs"} onClick={handleLogout}>
                      로그아웃
                    </Button>
                  </div>
                  {!user.walletAddress && (
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <Button onClick={handleMakeWallet} size={"sm"}>
                        지갑 만들기
                      </Button>
                      <Button onClick={handleAddWallet} size={"sm"}>
                        지갑 연동
                      </Button>
                    </div>
                  )}
                  {user.walletAddress && (
                    <div
                      className="gap-1"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {/* <Button onClick={handleCopyAddress} size={"xs"}>
                        {copied ? "복사됨!" : "복사하기"}
                      </Button> */}
                      <Button onClick={handleGetWallet} size={"xs"}>
                        지갑 정보
                      </Button>
                      <Button onClick={handleAddWallet} size={"xs"}>
                        지갑 수정
                      </Button>
                    </div>
                  )}
                  <h2 className="pt-3">
                    현재 기본 말 :{" "}
                    {user.productName ? user.productName : "없음"}
                  </h2>
                </div>
              </div>
              <UserNft />
            </div>
          </ModalContent>
        </ModalStyle>
      </Container>
      {wallet && (
        <>
          <MiniModal>
            <h1>발급된 지갑 정보</h1>
            <MiniModalContent>
              <p>Kaikas에 연동해서 모바일에서도 NFT를 확인해보세요!</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p>주소 : {maskAddress(wallet.address)}</p>
                <Button onClick={handleCopyNewAddress} size={"xs"}>
                  {newAddressCopied ? "복사됨!" : "복사하기"}
                </Button>
              </div>
              <br />
              {wallet.mnemonic ? (
                <div>
                  <p>
                    연상 기호 : <br />
                    {wallet.mnemonic}
                  </p>
                </div>
              ) : null}

              <br />
              <div style={{ display: "flex", alignItems: "center" }}>
                <p>개인키 : {maskAddress(wallet.privateKey)}</p>
                <Button onClick={handleCopyPrivateKey} size={"xs"}>
                  {newPrivateKeyCopied ? "복사됨!" : "복사하기"}
                </Button>
              </div>
              <Button className="mt-5" size={"xs"} onClick={handleCloseWallet}>
                닫기
              </Button>
            </MiniModalContent>
          </MiniModal>
        </>
      )}
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
