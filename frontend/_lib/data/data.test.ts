import { NEW_GRAPH, NEW_GRAPH_CENTER } from "./newNode";
import { IngameGraphNode } from "./types";
import { ORIGIN_EDGE, ORIGIN_GRAPH, getNode, makeEdgeId } from "./data";

describe("너의 테스트를 작성해줘", () => {
  test("새로운 ORIGIN_GRAPH 생성 알고리즘", () => {
    const [CENTER_X, CENTER_Y] = NEW_GRAPH_CENTER;

    // TODO: [x, y] 가 [0, 0]이면 없어진 노드임

    const newGraph: Record<string, IngameGraphNode | null> = {};

    // 1. nodeId, position 채우기
    NEW_GRAPH.forEach(([x, y], nodeId) => {
      if (x === 0 && y === 0) {
        newGraph[String(nodeId)] = null;
      } else {
        // @ts-ignore
        newGraph[String(nodeId)] = {
          nodeId,
          position: {
            x: x - CENTER_X,
            y: y - CENTER_Y,
            z: 10,
          },
        };
      }
    });

    // 2. type 채우기
    for (const [nodeId, node] of Object.entries(newGraph)) {
      if (node) {
        // 해적 해군
        if (node.nodeId < 200) {
          node.type = "PIRATE";
        } else {
          node.type = "MARINE";
        }
      }
    }

    // 3. 새로운 이웃노드 정보를 이용해서 이웃노드리스트 필드 추가
    for (let nodeId = 0; nodeId < ORIGIN_EDGE.length; nodeId += 1) {
      if (newGraph[nodeId]) {
        // @ts-ignore
        newGraph[nodeId].neighborNodeIdList = ORIGIN_EDGE[nodeId];
      }
    }

    //console.log(JSON.stringify(newGraph));
  });

  test("ORIGIN_GRAPH 기반으로 nodeEntries를 생성하는 알고리즘", () => {
    // @ts-ignore
    const nodeEntries: [number, IngameGraphNode][] = Object.entries(
      ORIGIN_GRAPH,
    )
      .filter(([nodeId, node]) => node !== null)
      .map(([nodeId, node]) => {
        return [parseInt(nodeId, 10), node];
      });

    console.log(JSON.stringify(nodeEntries));
  });

  test("ORIGIN_GRAPH 기반으로 duplicatedRemovedEdgeEntries를 생성하는 알고리즘", () => {
    const visited = new Set<string>();

    for (const [nodeId, aNode] of Object.entries(ORIGIN_GRAPH)) {
      if (!aNode) {
        continue;
      }

      const { neighborNodeIdList } = aNode;
      const edgeIdList = neighborNodeIdList.map(bNodeId =>
        makeEdgeId(aNode, getNode(bNodeId)),
      );
      edgeIdList.forEach(edgeId => {
        if (!visited.has(edgeId)) {
          visited.add(edgeId);
        }
      });
    }

    const obj: Record<string, []> = {};

    Array.from(visited).forEach(edgeId => {
      const [aNodeId, bNodeId] = edgeId.split("#");
      if (!obj[aNodeId]) {
        // @ts-ignore
        obj[aNodeId] = [];
      }
      // @ts-ignore
      obj[aNodeId].push(Number(bNodeId));
    });

    const result = Object.entries(obj).map(([key, value]) => [
      Number(key),
      value,
    ]);

    console.log(JSON.stringify(result));
  });
});
