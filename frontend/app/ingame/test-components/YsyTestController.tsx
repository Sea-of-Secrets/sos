import { useRef } from "react";
import styled from "@emotion/styled";

import { useSystemPrompt } from "~/app/ingame/stores/useSystemPrompt";
import { useCamera } from "~/app/ingame/stores/useCamera";
import { getNode } from "~/_lib/data/data";
import { usePiratePiece } from "../stores/usePiratePiece";

export default function YongSangYoonTestController() {
  const cameraZoomInputRef = useRef<HTMLInputElement>(null);
  const systemPromptHeaderInputRef = useRef<HTMLInputElement>(null);
  const systemPromptFooterInputRef = useRef<HTMLInputElement>(null);
  const { setHeaderMessage, setFooterMessage } = useSystemPrompt();
  const { zoom, zoomFullScreen } = useCamera();
  const { movePiece } = usePiratePiece();

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
        movePiece(getNode(nodeId).position);
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
        <div style={{ display: "flex" }}>
          <Button onClick={handleZoomNode}>노드 번호로 카메라 줌</Button>
          <Button onClick={handleMovePiece}>노드 번호로 이동</Button>
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
