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
    size: 50,
  },
  MARINE1: {
    src: "/marine_ship1/scene.gltf",
    size: 5,
  },
  MARINE2: {
    src: "/marine_ship2/scene.gltf",
    size: 5,
  },
  MARINE3: {
    src: "/marine_ship3/scene.gltf",
    size: 5,
  },
} as const;

export const PieceEffectPathMap = {
  FOOTHOLD_LIGHT_BEAM: "/appearance_effect_light_beam/scene.gltf", // 약간 하늘색
  FOOTHOLD_STARLIGHT: "/appearance_effect_starlight/scene.gltf", // 흰색
} as const;

export const MapPathMap = {
  TOP_LEFT: {
    src: "/assets/map_topleft.png",
  },
  TOP_RIGHT: {
    src: "/assets/map_topright.png",
  },
  BOTTOM_LEFT: {
    src: "/assets/map_bottomleft.png",
  },
  BOTTOM_RIGHT: {
    src: "/assets/map_bottomright.png",
  },
};
