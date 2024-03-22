const defaultIntensity = 3;
const defaultPosition: [number, number, number] = [5, 5, 5];

export default function Light() {
  return (
    <directionalLight
      color="#FFFFFF"
      intensity={defaultIntensity}
      position={defaultPosition}
    />
  );
}
