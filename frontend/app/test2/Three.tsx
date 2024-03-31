import MainMap from "./models/MainMap";
import { useCameraTest } from "./stores/useCamera";

export default function IngameThree() {
  //useCameraTest(); // MainMap의 x,y,z 좌표를 쉽게 돌려볼수있음

  return (
    <>
      <MainMap />
    </>
  );
}
