import { useState } from "react";
import styled from "@emotion/styled";
import Button from "./Button";
import * as UsersApi from "~/app/api/users";
import { NFTType } from "~/app/auth/types";
import { useAuth } from "../../auth/useAuth";

interface NftCarouselProps {
  nfts: NFTType[];
}

export default function NftCarousel({ nfts }: NftCarouselProps) {
  const { user } = useAuth();
  const [currentNftIndex, setCurrentNftIndex] = useState(0);
  const [shipsetting, setShipsetting] = useState("기본 배");

  const prevNft = () => {
    setShipsetting("기본으로 설정");
    setCurrentNftIndex(prevIndex =>
      prevIndex === 0 ? nfts.length - 1 : prevIndex - 1,
    );
  };

  const nextNft = () => {
    setShipsetting("기본으로 설정");
    setCurrentNftIndex(prevIndex =>
      prevIndex === nfts.length - 1 ? 0 : prevIndex + 1,
    );
  };

  if (!nfts || nfts.length === 0) {
    return <p>가지고 있는 NFT가 없습니다.</p>;
  }

  const saveHandler = async () => {
    try {
      await UsersApi.saveDefaultPiece(nfts[currentNftIndex].name);
      setShipsetting("완료됨!");
      window.alert("변경 성공!");
    } catch (e) {
      window.alert("변경 실패");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid black",
        }}
        className="my-5 mx-10"
      >
        <button
          onClick={prevNft}
          style={{ fontSize: "3rem", position: "absolute", left: 0 }}
        >
          {"<"}
        </button>
        <button
          onClick={nextNft}
          style={{ fontSize: "3rem", position: "absolute", right: 0 }}
        >
          {">"}
        </button>
        <Slide>
          <div
            style={{
              width: "12rem",
              height: "15rem",
              border: "1px solid black",
            }}
          >
            {/* <NftCard
              style={{
                width: "15rem",
                height: "14rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                transform: `rotateY(${currentNftIndex * 360}deg)`,
              }}
            >
              <h2>{nfts[currentNftIndex].name}</h2>
              <img
                src={nfts[currentNftIndex].image || ""}
                alt={nfts[currentNftIndex].name}
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
              <p className="mt-2">{nfts[currentNftIndex].description || ""}</p>
            </NftCard> */}
          </div>
        </Slide>
      </div>
      <Button size={"sm"} onClick={saveHandler}>
        {user?.productName === "현재 컴포넌트?" ? "기본 배" : `${shipsetting}`}
      </Button>
    </div>
  );
}

const Slide = styled.div`
  transition: transform 1s ease-in-out;
`;

const NftCard = styled.div`
  display: flex;
  flexdirection: column;
  alignitems: center;
  border: 1px solid #ccc;
  borderradius: 10px;
  padding: 20px;
  boxshadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: transform 1s ease-in-out; // 애니메이션 효과 적용
`;
