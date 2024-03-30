import { PerspectiveCamera, CameraControls } from "@react-three/drei";
import Model from "./Model";
export default function IngameThree() {
  return (
    <>
      <Model />
      <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 0.5} />
      <ambientLight intensity={0.1} />
      <directionalLight color="#FFF" position={[0, 1, 0]} />
      <PerspectiveCamera fov={40} near={10} far={1000} position={[10, 0, 50]} />
      <axesHelper scale={10} />
    </>
  );
}
