import HologramCard from "../render/components/HologramCard";

const MOCK_IMAGE_SRC =
  "https://a710choi.s3.ap-northeast-2.amazonaws.com/f150b925-5f5c-4fe3-9676-3b6c9e41b536.png";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        gap: "3px",
      }}
    >
      <HologramCard
        width={240}
        name="Zuhee"
        grade="LEGENDARY"
        src={MOCK_IMAGE_SRC}
      />
      <HologramCard
        width={240}
        name="핑핑호"
        grade="RARE"
        src={MOCK_IMAGE_SRC}
      />
      <HologramCard
        width={240}
        name="낡은배"
        grade="COMMON"
        src={MOCK_IMAGE_SRC}
      />
    </div>
  );
}
