export const PiecePathMap = {
  SHIBA: {
    src: "/shiba/scene.gltf",
    size: 0.03,
  },
  TREASURE: {
    src: "/treasure_chest/scene.gltf",
    size: 0.5,
  },
  PIRATE: {
    src: "/pirate_ship/scene.gltf",
    size: 5,
  },
} as const;

export const PieceEffectPathMap = {
  FOOTHOLD_LIGHT_BEAM: "/appearance_effect_light_beam/scene.gltf", // 약간 하늘색
  FOOTHOLD_STARLIGHT: "/appearance_effect_starlight/scene.gltf", // 흰색
} as const;
