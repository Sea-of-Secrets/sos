import { PrimitiveProps } from "@react-three/fiber";
import { IngameGraphNode } from "~/_lib/data/types";

export interface BaseNodeProps extends Omit<PrimitiveProps, "object"> {
  node: IngameGraphNode;
}

export interface MarineNodeProps extends BaseNodeProps {}

export interface PirateNodeProps extends BaseNodeProps {}
