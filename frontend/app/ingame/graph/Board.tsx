"use client";

import { Suspense, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh } from "three";
import Shiba from "./Shiba";
import PirateNode from "./PirateNode";
import NavyNode from "./NavyNode";
import Line from "./Line";

function GameBoard() {
  const fileUrl = "/cartoon_low_poly_world_map/scene.gltf";
  const mesh = useRef<Mesh>(null!);
  const board = useLoader(GLTFLoader, fileUrl);

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1500}>
      <primitive object={board.scene} />
    </mesh>
  );
}

export default function Board() {
  const Pirate = [
    [120, 60],
    [383, 46],
    [522, 52],
    [735, 52],
    [841, 50],
    [989, 50],
    [1217, 72],
    [66, 117],
    [157, 79],
    [180, 128],
    [219, 91],
    [265, 89],
    [307, 150],
    [351, 91],
    [389, 152],
    [413, 107],
    [467, 109],
    [519, 116],
    [610, 132],
    [743, 85],
    [763, 147],
    [821, 100],
    [904, 85],
    [984, 142],
    [1093, 89],
    [1239, 155],
    [1327, 101],
    [97, 191],
    [169, 168],
    [177, 219],
    [242, 229],
    [295, 195],
    [355, 207],
    [427, 209],
    [497, 210],
    [540, 242],
    [584, 181],
    [651, 167],
    [652, 229],
    [712, 214],
    [773, 193],
    [853, 185],
    [934, 242],
    [953, 187],
    [1088, 166],
    [1095, 228],
    [1313, 193],
    [107, 251],
    [141, 280],
    [143, 318],
    [243, 302],
    [335, 334],
    [335, 295],
    [392, 266],
    [430, 328],
    [583, 264],
    [655, 304],
    [752, 324],
    [800, 265],
    [921, 312],
    [1004, 315],
    [1018, 265],
    [1105, 308],
    [1214, 313],
    [1248, 270],
    [1290, 329],
    [1312, 276],
    [124, 375],
    [201, 396],
    [283, 413],
    [377, 385],
    [490, 348],
    [593, 344],
    [661, 381],
    [727, 396],
    [829, 360],
    [856, 401],
    [954, 396],
    [1060, 387],
    [1193, 392],
    [83, 443],
    [209, 458],
    [332, 477],
    [354, 432],
    [392, 484],
    [488, 482],
    [492, 437],
    [548, 456],
    [646, 484],
    [705, 445],
    [752, 498],
    [761, 449],
    [880, 466],
    [990, 455],
    [1071, 443],
    [1225, 503],
    [1242, 420],
    [1338, 460],
    [147, 517],
    [243, 558],
  ];
  const Navy = [
    [116, 103],
    [140, 136],
    [535, 354],
    [461, 371],
    [484, 405],
  ];
  const TmpLine = [
    [
      [-241, 50, -126],
      [-211, 50, -148],
      [-217, 50, -91],
      [-166, 50, -142],
    ],
    [
      [-108, 50, -152],
      [-166, 50, -142],
    ],
  ];
  return (
    <div className="flex justify-center items-center h-screen">
      <Canvas camera={{ position: [0, 1000, 500], far: 10000, fov: 50 }}>
        <Suspense>
          <GameBoard />
          {/* <Shiba /> */}
          {Pirate.map((position, index) => (
            <PirateNode
              key={index}
              number={index + 1}
              x={position[0] - 701}
              y={position[1] - 496}
            />
          ))}
          {Navy.map((position, index) => (
            <NavyNode key={index} x={position[0] - 701} y={position[1] - 496} />
          ))}
          {TmpLine.map((array, index) => (
            <Line key={index} position={array} />
          ))}
        </Suspense>
        <OrbitControls />
        <ambientLight intensity={2} />
      </Canvas>
    </div>
  );
}
