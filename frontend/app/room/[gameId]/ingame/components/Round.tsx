import styles from "./Round.module.scss";

import * as React from "react";
import { clsx } from "clsx";

import { matcher } from "~/_lib/utils";
import TreasureImage from "./TreasureImage";
import { useSocketMessage } from "../stores/useSocketMessage";
import useNickname from "~/store/nickname";

interface RoundProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  topLeft?: [number | string, number | string];
}

const sizeMatcher = matcher({
  sm: 80,
  md: 100,
  lg: 120,
});

export default function Round({
  className,
  size,
  topLeft,
  ...props
}: RoundProps) {
  const width = sizeMatcher(size || "md");
  const [top, left] = topLeft || [0, 0];
  const { socketMessage } = useSocketMessage();
  const { nickname } = useNickname();
  const trueCount = Object.values(socketMessage.game?.treasures || {}).filter(
    Boolean,
  ).length;
  const treasureNames = ["DEFAULT", "DEFAULT", "DEFAULT", "DEFAULT"];
  if (socketMessage.game?.players[0]["nickname"] === nickname) {
    if (trueCount >= 1) treasureNames[0] = "TREASURE3";
    if (trueCount >= 2) treasureNames[1] = "TREASURE3";
    if (trueCount >= 3) treasureNames[2] = "TREASURE3";
    if (trueCount >= 4) treasureNames[3] = "TREASURE3";
  } else {
    if (trueCount >= 1) treasureNames[0] = "EMPTY";
    if (trueCount >= 2) treasureNames[1] = "EMPTY";
    if (trueCount >= 3) treasureNames[2] = "EMPTY";
    if (trueCount >= 4) treasureNames[3] = "EMPTY";
  }

  return (
    <div
      {...props}
      className={clsx(styles.container, "banselect", className)}
      style={{
        width: `${width}px`,
        top,
        left,
      }}
    >
      <div className="bg-yellow-900 border-amber-950">
        {treasureNames.map((name, index) => (
          <TreasureImage
            key={index}
            name={name as "DEFAULT" | "EMPTY" | "TREASURE3"}
          />
        ))}
      </div>
    </div>
  );
}
