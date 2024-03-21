// @ts-nocheck

import { INGAME_GRAPH, NODE_ENTRY } from "./data";

test("edge", () => {
  //   const visited = new Set();
  //   // 간선을 가지고 있는 노드만 먼저 추림
  //   const realNodeMap = {};
  //   for (const [nodeId, node] of Object.entries(INGAME_GRAPH)) {
  //     if (node.neighbors && node.neighbors.length > 0) {
  //       realNodeMap[nodeId] = node;
  //     }
  //   }
  //   const result = [];
  //   for (const [nodeId, node] of Object.entries(realNodeMap)) {
  //     for (const neighbor of node.neighbors) {
  //       const edge1 = `${nodeId}-${neighbor}`;
  //       const edge2 = `${neighbor}-${nodeId}`;
  //       if (!visited.has(edge1) && !visited.has(edge2)) {
  //         visited.add(edge1);
  //         visited.add(edge2);
  //         result.push([parseInt(nodeId, 10), neighbor]);
  //       }
  //     }
  //   }
  //   //   console.log(
  //   //     JSON.stringify(
  //   //       NODE_ENTRY.map(([nodeId, node]) => [parseInt(nodeId, 10), node]),
  //   //     ),
  //   //   );
  //   const removedEdgeMap = {};
  //   for (const [a, b] of result) {
  //     if (!removedEdgeMap[a]) {
  //       removedEdgeMap[a] = [];
  //     }
  //     removedEdgeMap[a].push(b);
  //   }
  //   console.log(
  //     JSON.stringify(
  //       Object.entries(removedEdgeMap).map(([key, value]) => {
  //         return [parseInt(key, 10), value];
  //       }),
  //     ),
  //   );
  //   for (const node of Object.values(INGAME_GRAPH)) {
  //     const [x, y, z] = node.position;
  //     node.position = {
  //       x,
  //       y,
  //       z,
  //     };
  //   }
  //   console.log(JSON.stringify(INGAME_GRAPH));
  //   for (const [_, node] of NODE_ENTRY) {
  //     const [x, y, z] = node.position;
  //     node.position = {
  //       x,
  //       y,
  //       z,
  //     };
  //   }
  //   console.log(JSON.stringify(NODE_ENTRY));
});
