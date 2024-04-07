import { useEffect, useState } from "react";
import Carousel from "react-spring-3d-carousel";
import Button from "./Button";
import * as UsersApi from "~/app/api/users";
import { GradeType, NFTType } from "~/app/auth/types";
import { useAuth, validateNftListData } from "../../auth/useAuth";
import HologramCard from "./HologramCard";

interface NftCarouselProps {
  nfts: NFTType[];
}

export default function NftCarousel({ nfts }: NftCarouselProps) {
  const { user, setNftList } = useAuth();
  const [shipsetting, setShipsetting] = useState("기본으로 설정");
  const [goToSlide, setGoToSlide] = useState<number>(0);

  useEffect(() => {
    if (nfts[0].name === user?.productName) {
      setShipsetting("기본 배");
    }
  }, [nfts, user?.productName]);

  if (!nfts || nfts.length === 0) {
    return <p>가지고 있는 NFT가 없습니다.</p>;
  }

  const saveHandler = async () => {
    try {
      await UsersApi.saveDefaultPiece(nfts[goToSlide].name);
      setShipsetting("완료됨!");

      // 지갑 정보 업데이트
      try {
        const { data: nftListData } = await UsersApi.getWallet();
        if (validateNftListData(nftListData)) {
          setNftList(nftListData);
        }
        return;
      } catch (e) {
        console.error("fetch fail nftList");
      }
      // window.alert("변경 성공!");
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
        src={`/ship_images/${nft.name}.png` || nft.image || ""}
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
