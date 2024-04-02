import Map from "./Map";
import { useCameraTest } from "./stores/useCamera";

export default function ThreeRenderer() {
  useCameraTest(); // MainMap의 x,y,z 좌표를 쉽게 돌려볼수있음

  return <Map />;
}
