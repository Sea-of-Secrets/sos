import { ORIGIN_GRAPH } from "./data";
import { IngameGraphNode } from "./types";

export const _getNode = (nodeId: number) => {
  // FIXME: release 할 때는 에러 터뜨리지 말기
  if (!(String(nodeId) in ORIGIN_GRAPH)) {
    throw new Error(
      `버그 발생!!! : 서버에서 온 ${nodeId} 는 클라이언트에 존재하지 않음...`,
    );
  }

  const node = ORIGIN_GRAPH[nodeId];

  if (!node) {
    throw new Error(
      `버그 발생!!! : 서버에서 온 ${nodeId} 는 존재하지 않는 노드임...`,
    );
  }

  return Object.freeze({ ...node, position: node.position });
};

export const _makeEdgeId = (
  aNode: IngameGraphNode | null,
  bNode: IngameGraphNode | null,
) => {
  if (aNode === null || bNode === null) {
    throw new Error(
      `버그 발생!!! : 서버에서 온 ${aNode} 혹은 ${bNode} 는 클라이언트에 존재하지 않음...`,
    );
  }

  return [aNode.nodeId, bNode.nodeId]
    .sort((a, b) => (a < b ? -1 : 1))
    .join("#");
};

// TODO: 해적, 해군간선 통과해서 구해야함;;;
export const _getNearEdgeIdList = (nodeId: number) => {
  // FIXME: release 할 때는 에러 터뜨리지 말기
  if (!(String(nodeId) in ORIGIN_GRAPH)) {
    throw new Error(
      `버그 발생!!! : 서버에서 온 ${nodeId} 는 클라이언트에 존재하지 않음...`,
    );
  }

  const node = ORIGIN_GRAPH[nodeId];

  if (!node) {
    throw new Error(
      `버그 발생!!! : 서버에서 온 ${nodeId} 는 존재하지 않는 노드임...`,
    );
  }

  const { neighborNodeIdList } = node;

  return neighborNodeIdList.map(aNodeId =>
    _makeEdgeId(ORIGIN_GRAPH[aNodeId], node),
  );
};
