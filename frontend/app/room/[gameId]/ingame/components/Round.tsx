import styles from "./Round.module.scss";

import * as React from "react";
import { clsx } from "clsx";

import { matcher } from "~/_lib/utils";
import TreasureImage from "./TreasureImage";

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
        <TreasureImage name="DEFAULT" />
        <TreasureImage name="DEFAULT" />
        <TreasureImage name="DEFAULT" />
        <TreasureImage name="DEFAULT" />
      </div>
    </div>
  );
}
