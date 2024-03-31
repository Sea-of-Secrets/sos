const defaultIntensity = 5;
const defaultPosition: [number, number, number] = [5, 5, 5];

export default function Light() {
  return (
    <>
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight
        color="#FFFFFF"
        intensity={defaultIntensity}
        position={defaultPosition}
      />
    </>
  );
}
