import { useRef } from "react";
import styled from "@emotion/styled";

import { useSystemPrompt } from "~/app/ingame/stores/useSystemPrompt";
import { isNumber } from "~/_lib/utils";
import { INGAME_GRAPH } from "~/_lib/data/data";
import { useCamera } from "~/app/ingame/stores/useCamera";

export default function YongSangYoonTestController() {
  const cameraZoomInputRef = useRef<HTMLInputElement>(null);
  const systemPromptHeaderInputRef = useRef<HTMLInputElement>(null);
  const systemPromptFooterInputRef = useRef<HTMLInputElement>(null);
  const { setHeaderMessage, setFooterMessage } = useSystemPrompt();
  const { cameraRef } = useCamera();

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
      if (isNumber(nodeId) && nodeId in INGAME_GRAPH) {
        const { x, y, z } = INGAME_GRAPH[nodeId]["position"];
        if (cameraRef) {
          cameraRef.current.setLookAt(x, 250, y + 200, x, 0, y, true);
          cameraRef.current.zoomTo(1.5, true);
        } else {
          window.alert("카메라가 없다...");
        }
        return;
      }
      window.alert("올바른 노드 번호를 입력해라...");
      cameraZoomInputRef.current.value = "";
    }
  };

  const handleZoomFullScreen = () => {
    if (cameraRef) {
      cameraRef.current.setLookAt(0, 700, 600, 0, 0, 100, true);
      cameraRef.current.zoomTo(1, true);
    } else {
      window.alert("카메라가 없다...");
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
        <Button onClick={handleZoomNode}>노드 번호로 카메라 줌</Button>
        <Button onClick={handleZoomFullScreen}>전체화면</Button>
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
