import { useFrame } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";

// 말 이동 프레임별 업데이트
export default function Tween() {
  useFrame(() => {
    TWEEN.update();
  });

  return null;
}
