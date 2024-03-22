import { useRef } from "react";
import styled from "@emotion/styled";

import { useSystemPrompt } from "~/app/ingame/stores/useSystemPrompt";
import { useCamera } from "~/app/ingame/stores/useCamera";
import { getNode } from "~/_lib/data/data";
import { usePiratePiece } from "../stores/piece";
import { usePirateGraph } from "../stores/graph";

export default function YongSangYoonTestController() {
  const cameraZoomInputRef = useRef<HTMLInputElement>(null);
  const systemPromptHeaderInputRef = useRef<HTMLInputElement>(null);
  const systemPromptFooterInputRef = useRef<HTMLInputElement>(null);
  const { setHeaderMessage, setFooterMessage } = useSystemPrompt();
  const { zoom, zoomFullScreen } = useCamera();
  const { movePiece } = usePiratePiece();
  const { setMovableNodeIdList } = usePirateGraph();

  const handleClickSystemPromptHeader = () => {
    if (systemPromptHeaderInputRef.current) {
      setHeaderMessage(systemPromptHeaderInputRef.current.value);
    }
  };

  const handleClickSystemPromptFooter = () => {
    if (systemPromptFooterInputRef.current) {
      setFooterMessage(systemPromptFooterInputRef.current.value);
    }
  };

  const handleClickSystemPromptRenderReactComponent = () => {
    if (systemPromptFooterInputRef.current) {
      setFooterMessage(
        <>
          <div>This is React Component</div>
          <button className="button" onClick={() => window.alert("배고프다")}>
            눌러봥ㅋ
          </button>
        </>,
      );
    }
  };

  const handleZoomNode = () => {
    if (cameraZoomInputRef.current) {
      const nodeId = parseInt(cameraZoomInputRef.current.value, 10);

      try {
        zoom(getNode(nodeId).position);
      } catch (e) {
        window.alert("올바른 노드 번호를 입력해라...");
        cameraZoomInputRef.current.value = "";
      }
    }
  };

  const handleZoomFullScreen = () => {
    zoomFullScreen();
  };

  const handleMovePiece = () => {
    if (cameraZoomInputRef.current) {
      const nodeId = parseInt(cameraZoomInputRef.current.value, 10);

      try {
        movePiece({
          position: getNode(nodeId).position,
          moveAnimationStyle: "JUMP",
        });
      } catch (e) {
        window.alert("올바른 노드 번호를 입력해라...");
        cameraZoomInputRef.current.value = "";
      }
    }
  };

  const handleShowNeighbors = () => {
    if (cameraZoomInputRef.current) {
      const nodeId = parseInt(cameraZoomInputRef.current.value, 10);
      try {
        const { neighborNodeIdList } = getNode(nodeId);

        if (neighborNodeIdList.length === 0) {
          window.alert("연결된 이웃노드가 없다...");
          return;
        }

        // 마린노드의 이웃노드는 파이렛노드라서 반대로 색깔이 바뀌는데 서버에서는 제대로 올거니까 큰 의미없음.
        setMovableNodeIdList(neighborNodeIdList);
      } catch (e) {
        window.alert("올바른 노드 번호를 입력해라...");
        cameraZoomInputRef.current.value = "";
      }
    }
  };

  return (
    <ContainerStyle>
      <Test>
        <input
          ref={systemPromptHeaderInputRef}
          placeholder="system prompt header test"
        />
        <Button onClick={handleClickSystemPromptHeader}>
          시스템프롬프트헤더 렌더
        </Button>
      </Test>
      <Test>
        <input
          ref={systemPromptFooterInputRef}
          placeholder="system prompt footer test"
        />
        <Button onClick={handleClickSystemPromptFooter}>
          시스템프롬프트푸터 렌더
        </Button>
      </Test>
      <Test>
        <Button onClick={handleClickSystemPromptRenderReactComponent}>
          시스템프롬프트푸터 리액트로 렌더
        </Button>
      </Test>
      <Test>
        <input
          ref={cameraZoomInputRef}
          type="number"
          placeholder="노드 번호를 입력해볼래?"
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button onClick={handleZoomNode}>노드 번호로 카메라 줌</Button>
          <Button onClick={handleMovePiece}>노드 번호로 이동</Button>
          <Button onClick={handleShowNeighbors}>이웃 노드 ON</Button>
          <Button onClick={() => setMovableNodeIdList([])}>
            이웃 노드 OFF
          </Button>
          <Button onClick={handleZoomFullScreen}>전체화면</Button>
        </div>
      </Test>
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  border: 3px solid tomato;
  padding: 3px;

  display: flex;
  gap: 3px;
  flex-direction: column;
`;

const Test = styled.div`
  border: 1px solid royalblue;
  border-radius: 4px;
`;

const Button = styled.button`
  all: unset;
  border: 1px solid black;
  background-color: black;
  color: white;

  &:hover {
    background-color: skyblue;
  }

  cursor: pointer;
`;
