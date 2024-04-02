import React from "react";
import { useOption } from "../stores/useOption";
import MiniModalContent from "~/app/render/components/MiniModalContent";
import MiniModal from "~/app/render/components/MiniModal";
import Button from "~/app/render/components/Button";
import { useRouter } from "next/navigation";

export default function Off() {
  const router = useRouter();
  const { isOff, setIsOff } = useOption();
  if (!isOff) {
    return null;
  }

  return (
    <MiniModal>
      종료하시겠습니까?
      <MiniModalContent>게임 이탈은 비매너적인 행위입니다.</MiniModalContent>
      <div className="flex gap-3">
        <Button
          size="sm"
          onClick={() => {
            router.push("/");
          }}
        >
          확인
        </Button>
        <Button
          size="sm"
          onClick={() => {
            setIsOff();
          }}
        >
          취소
        </Button>
      </div>
    </MiniModal>
  );
}
