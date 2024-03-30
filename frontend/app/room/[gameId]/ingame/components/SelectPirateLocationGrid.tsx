import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo } from "react";
import { MapPathMap } from "~/assetPath";
import { useCamera } from "../stores/useCamera";
import { getNode } from "~/_lib/data/data";

interface SelectPirateLocationProps {
  nodeIdListOnTreasures: number[];
  onSelectLocation: (nodeId: number) => void;
}

export default function SelectPirateLocationGrid({
  nodeIdListOnTreasures,
  onSelectLocation,
}: SelectPirateLocationProps) {
  const { cameraRef, zoom } = useCamera();
  const LocationToNodeIdMap = useMemo(
    () => makeLocationToNodeIdMap(nodeIdListOnTreasures),
    [nodeIdListOnTreasures],
  );

  const handleHover = useCallback(
    (location: keyof typeof MapPathMap) => {
      const nodeId = LocationToNodeIdMap[location];
      const { position } = getNode(nodeId);
      zoom(position, {
        level: 2,
      });
    },
    [LocationToNodeIdMap, zoom],
  );

  const handleClickQuadrant = (location: keyof typeof MapPathMap) => {
    const nodeId = LocationToNodeIdMap[location];
    onSelectLocation(nodeId);
  };

  const fullScreen = useCallback(() => {
    if (cameraRef?.current) {
      cameraRef?.current.setLookAt(0, 1200, 1000, 0, 0, 200, true);
    }
  }, [cameraRef]);

  // useEffect(() => {
  //   fullScreen();
  // }, [fullScreen]);

  return (
    <Grid onMouseLeave={fullScreen}>
      <GridItem>
        <Img
          src={MapPathMap.TOP_LEFT.src}
          onMouseEnter={() => handleHover("TOP_LEFT")}
          onClick={() => handleClickQuadrant("TOP_LEFT")}
        />
      </GridItem>
      <GridItem>
        <Img
          src={MapPathMap.TOP_RIGHT.src}
          onMouseEnter={() => handleHover("TOP_RIGHT")}
          onClick={() => handleClickQuadrant("TOP_RIGHT")}
        />
      </GridItem>
      <GridItem>
        <Img
          src={MapPathMap.BOTTOM_LEFT.src}
          onMouseEnter={() => handleHover("BOTTOM_LEFT")}
          onClick={() => handleClickQuadrant("BOTTOM_LEFT")}
        />
      </GridItem>
      <GridItem>
        <Img
          src={MapPathMap.BOTTOM_RIGHT.src}
          onMouseEnter={() => handleHover("BOTTOM_RIGHT")}
          onClick={() => handleClickQuadrant("BOTTOM_RIGHT")}
        />
      </GridItem>
    </Grid>
  );
}

const Grid = styled.div`
  max-width: 300px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const GridItem = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;

  cursor: pointer;

  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const getQuadrant = (nodeId: number): keyof typeof MapPathMap => {
  const node = getNode(nodeId);
  const { position } = node;
  const { x, y } = position;

  if (x < 0 && y < 0) {
    return "TOP_LEFT";
  }

  if (x > 0 && y > 0) {
    return "BOTTOM_RIGHT";
  }

  if (x < 0 && y > 0) {
    return "BOTTOM_LEFT";
  }

  return "TOP_RIGHT";
};

const makeLocationToNodeIdMap = (nodeIdListOnTreasures: number[]) => {
  return nodeIdListOnTreasures.reduce(
    (obj, nodeId) => {
      const quadrant = getQuadrant(nodeId);
      obj[quadrant] = nodeId;
      return obj;
    },
    {} as Record<keyof typeof MapPathMap, number>,
  );
};
