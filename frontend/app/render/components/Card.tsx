// @ts-nocheck

import { useState } from "react";

import Button from "./Button";
import * as UsersApi from "~/app/api/users";
import { GradeType, NFTType } from "~/app/auth/types";
import { useAuth } from "../../auth/useAuth";
import HologramCard from "./HologramCard";
import Carousel from "./Carousel";

interface NftCarouselProps {
  nfts: NFTType[];
}

export default function NftCarousel({ nfts }: NftCarouselProps) {
  const { user } = useAuth();
  const [shipsetting, setShipsetting] = useState("기본 배");
  const [goToSlide, setGoToSlide] = useState<number>(0);

  if (!nfts || nfts.length === 0) {
    return <p>가지고 있는 NFT가 없습니다.</p>;
  }

  const saveHandler = async () => {
    try {
      await UsersApi.saveDefaultPiece(nfts[goToSlide].name);
      setShipsetting("완료됨!");
      window.alert("변경 성공!");
    } catch (e) {
      window.alert("변경 실패");
    }
  };

  const slides = nfts.map((nft, index) => ({
    key: index,
    content: (
      <HologramCard
        key={index}
        width={200}
        name={nft.name}
        grade={nft.description as GradeType}
        src={nft.image || ""}
      />
    ),
    onClick: () => {
      setGoToSlide(index);
      setShipsetting("기본으로 설정");
    },
  }));

  return (
    <>
      <div
        style={{
          width: "11rem",
          height: "16rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Carousel
          slides={slides}
          showNavigation={false}
          goToSlide={goToSlide}
        />
      </div>
      <Button size={"sm"} onClick={saveHandler} className="absolute bottom-0">
        {user?.productName === nfts[goToSlide].name
          ? "기본 배"
          : `${shipsetting}`}
      </Button>
    </>
  );
}
