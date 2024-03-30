import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Ship_rug_0: THREE.Mesh;
    Ship_wood_trims_0: THREE.Mesh;
    Ship_wood_planks_0: THREE.Mesh;
    Ship_wood_painted_0: THREE.Mesh;
    Ship_sails_0: THREE.Mesh;
    Ship_building_mats_0: THREE.Mesh;
    Ship_emissive_0: THREE.Mesh;
    Ship_foliage_0: THREE.Mesh;
    Ship_foliage_02_0: THREE.Mesh;
    Ship_sand_caustics_0: THREE.Mesh;
    Ship_sand_tile_0: THREE.Mesh;
    Ship_rock_tile_0: THREE.Mesh;
    Ship_rocks_unique_0: THREE.Mesh;
    Ship_water_light_0: THREE.Mesh;
    Ship_bits_bobs_0: THREE.Mesh;
    sky_sky_0: THREE.Mesh;
    No_Shad_emissive_0: THREE.Mesh;
  };
  materials: {
    material: THREE.MeshBasicMaterial;
    wood_trims: THREE.MeshBasicMaterial;
    wood_planks: THREE.MeshBasicMaterial;
    wood_painted: THREE.MeshBasicMaterial;
    sails: THREE.MeshBasicMaterial;
    building_mats: THREE.MeshBasicMaterial;
    emissive: THREE.MeshBasicMaterial;
    foliage: THREE.MeshBasicMaterial;
    foliage_02: THREE.MeshBasicMaterial;
    sand_caustics: THREE.MeshBasicMaterial;
    sand_tile: THREE.MeshBasicMaterial;
    rock_tile: THREE.MeshBasicMaterial;
    rocks_unique: THREE.MeshBasicMaterial;
    water_light: THREE.MeshBasicMaterial;
    bits_bobs: THREE.MeshBasicMaterial;
    material_15: THREE.MeshBasicMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/tiki_treasure/scene.gltf",
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group
        position={[0.143, -22325.514, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={1}
      >
        <group rotation={[-Math.PI, 0, 0]}>
          <group position={[0, 0, 595.616]} scale={[1.329, 1.329, 0.872]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.sky_sky_0.geometry}
              material={materials.material_15}
              position={[0, 0, 9633.321]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_rug_0.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_wood_trims_0.geometry}
            material={materials.wood_trims}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_wood_planks_0.geometry}
            material={materials.wood_planks}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_wood_painted_0.geometry}
            material={materials.wood_painted}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_sails_0.geometry}
            material={materials.sails}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_building_mats_0.geometry}
            material={materials.building_mats}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_emissive_0.geometry}
            material={materials.emissive}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_foliage_0.geometry}
            material={materials.foliage}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_foliage_02_0.geometry}
            material={materials.foliage_02}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_sand_caustics_0.geometry}
            material={materials.sand_caustics}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_sand_tile_0.geometry}
            material={materials.sand_tile}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_rock_tile_0.geometry}
            material={materials.rock_tile}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_rocks_unique_0.geometry}
            material={materials.rocks_unique}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_water_light_0.geometry}
            material={materials.water_light}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ship_bits_bobs_0.geometry}
            material={materials.bits_bobs}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.No_Shad_emissive_0.geometry}
            material={materials.emissive}
          />
        </group>
      </group>
    </group>
  );
}
