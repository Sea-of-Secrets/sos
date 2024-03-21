import { nodeEntries, INGAME_EDGE } from "~/_lib/data";
import { NodeRenderer } from "./Node";

export default function Graph() {
  return (
    <>
      <NodeList />
      <EdgeList />
    </>
  );
}

const NodeList = () => {
  return (
    <>
      {nodeEntries.map(([key, node]) => (
        <NodeRenderer
          key={node.nodeId}
          node={node}
          // isNextMoveableNode={node.neighbors.length > 0}
        />
      ))}
    </>
  );
};

const EdgeList = () => {
  const renderedEdges = new Set();

  return <></>;

  // return (
  //     <>
  //     {DUMMY_DATA.edgeList.slice(199).map((edges, index) => {
  //     return edges.map(edge => {
  //       // 중복 간선 방지
  //       const edgeKey = `${index + 200}-${edge}`;
  //       const reEdgeKey = `${edge}-${index + 200}`;
  //       if (renderedEdges.has(edgeKey) || renderedEdges.has(reEdgeKey)) {
  //         return null;
  //       }
  //       renderedEdges.add(edgeKey);
  //       return (
  //         <Edge
  //           key={edgeKey}
  //           position={[
  //             DUMMY_DATA.nodeArr[edge],
  //             DUMMY_DATA.nodeArr[index + 200],
  //           ]}
  //           isNextNodeEdge={nextNodeEdge.some(
  //             ([start, end]: number[]) =>
  //               (start === index + 200 && end === edge) ||
  //               (start === edge && end === index + 200),
  //           )}
  //         />
  //       );
  //     });
  //   })}
  //     </>
  // )
};
