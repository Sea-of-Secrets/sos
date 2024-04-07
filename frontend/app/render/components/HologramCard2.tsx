"use client";

import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { GradeType } from "~/app/auth/types";

interface HologramCard2Props {
  name: string;
  grade: GradeType;
  src: string;
}

export default function HologramCard2({
  name,
  grade,
  src,
}: HologramCard2Props) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const newRotateY = (-1 / 5) * x + 20;
      const newRotateX = (4 / 30) * y - 20;

      setRotateX(newRotateX);
      setRotateY(newRotateY);
      setOpacity(x / 200);
    },
    [],
  );

  const handleMouseOut = useCallback(() => {
    setOpacity(0);
    setRotateX(0);
    setRotateY(0);
  }, []);

  const getBoxShadowColor = (grade: GradeType) => {
    switch (grade) {
      case "RARE":
        return "0 0 2rem rgba(0, 255, 0, 1)";
      case "LEGENDARY":
        return "0 0 2rem rgba(255, 255, 0, 1)";
      default:
        return "0 0 2rem rgba(255, 255, 255, 1)";
    }
  };

  return (
    <Card
      style={{
        transform: `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        boxShadow: getBoxShadowColor(grade),
      }}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      <Overlay
        grade={grade}
        style={{
          backgroundPosition: `${opacity * 5}%`,
          filter: `opacity(${opacity}) brightness(1.2)`,
        }}
      ></Overlay>
      <Image>
        <img src={src} />
      </Image>
      <Description>
        <div className="top-row">{name}</div>
        <div className="bottom-row">
          {/* <div>sos</div> */}
          <Grade grade={grade}>{grade.toUpperCase()}</Grade>
        </div>
      </Description>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 0.4rem;
  border-radius: 0.5rem;

  background-color: #3a3838;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: all 0.1s;

  cursor: pointer;
`;

const Overlay = styled.div<{ grade: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: ${({ grade }) => getBackgroundStyle(grade).overlayBackground};
  filter: brightness(1.1) opacity(0.8);
  mix-blend-mode: color-dodge;
  transition: all 0.1s;
`;

const Image = styled.div`
  box-sizing: border-box;
  width: 100%;

  > img {
    width: 100%;
    border-radius: 0.5rem;
  }
`;

const Description = styled.div`
  padding: 0.3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  color: white;

  > .top-row {
    align-self: flex-start;
    font-size: 1.1rem;
  }

  > .bottom-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const Grade = styled.div<{ grade: string }>`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 800;

  background: ${({ grade }) => getBackgroundStyle(grade).gradeBackground};
  color: transparent;
  -webkit-background-clip: text;
`;

const getBackgroundStyle = (
  grade: string,
): {
  overlayBackground: string;
  gradeBackground: string;
} => {
  if (grade === "LEGENDARY") {
    return {
      overlayBackground: `linear-gradient(
        105deg,
        transparent 40%,
        rgba(53, 246, 62, 0.8) 45%,
        rgba(132, 50, 255, 0.6) 50%,
        transparent 54%
      )`,
      gradeBackground: `linear-gradient(to right top, #ec41ff, #1fe91b)`,
    };
  }

  if (grade === "RARE") {
    return {
      overlayBackground: `linear-gradient(
        105deg,
        transparent 40%,
        rgba(34, 104, 255, 0.8) 45%,
        rgb(242, 250, 25) 50%,
        transparent 54%
      )`,
      gradeBackground: `linear-gradient(to right top, #4f7cf9, #f0f805)`,
    };
  }

  return {
    overlayBackground: `linear-gradient(
      105deg,
      transparent 40%,
      rgba(91, 91, 100, 0.8) 45%,
      rgb(106, 107, 102) 50%,
      transparent 54%
    )`,
    gradeBackground: `linear-gradient(to right top, #f7f8fc, #9c9c99)`,
  };
};
