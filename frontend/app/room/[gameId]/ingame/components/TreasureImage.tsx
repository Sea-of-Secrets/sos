import * as React from "react";
import Image from "next/image";
import clsx from "clsx";

import { matcher } from "~/_lib/utils";

interface TreasureProps extends React.HTMLAttributes<HTMLDivElement> {
  name:
    | "DEFAULT"
    | "EMPTY"
    | "TREASURE1"
    | "TREASURE2"
    | "TREASURE3"
    | "TREASURE4";
}

const treasureImageSourceMatcher = matcher({
  DEFAULT: "/assets/treasure_default.svg",
  EMPTY: "/assets/treasure_empty.svg",
  TREASURE1: "/assets/treasure_step1.svg",
  TREASURE2: "/assets/treasure_step2.svg",
  TREASURE3: "/assets/treasure_step3.svg",
  TREASURE4: "/assets/treasure_step4.svg",
});

export default function TreasureImage({
  name,
  className,
  ...props
}: TreasureProps) {
  const imageSource = treasureImageSourceMatcher(name);
  return (
    <div {...props} className={clsx(className)}>
      <div>
        <Image width={100} height={100} src={imageSource} alt={REFERENCE} />
      </div>
    </div>
  );
}

const REFERENCE =
  "https://kr.freepik.com/free-vector/isometric-treasure-chests-animation-set_9509869.htm#query=%EB%B3%B4%EB%AC%BC%20%EC%83%81%EC%9E%90&position=10&from_view=keyword&track=ais&uuid=fc1b3ec3-d47c-43c7-84ae-175f6333ff31";
