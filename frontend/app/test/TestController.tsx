import { useRef } from "react";
import styled from "@emotion/styled";

import { getNearEdgeIdList, getNode } from "~/_lib/data/data";

import { usePiratePiece } from "../room/[gameId]/ingame/stores/piece";
import { usePirateGraph } from "../room/[gameId]/ingame/stores/graph";
import { useSystemPrompt } from "../room/[gameId]/ingame/stores/useSystemPrompt";
import { useCamera } from "../room/[gameId]/ingame/stores/useCamera";
import {
  MarinePlayerKey,
  useWhenMarineStartGame,
} from "../room/[gameId]/ingame/stores/useWhenMarineStartGame";

import SelectPirateLocationGrid from "../room/[gameId]/ingame/components/SelectPirateLocationGrid";

import { useTimer } from "../room/[gameId]/ingame/stores/useTimer";

export default function TestController() {
  const cameraZoomInputRef = useRef<HTMLInputElement>(null);
  const systemPromptHeaderInputRef = useRef<HTMLInputElement>(null);
  const systemPromptFooterInputRef = useRef<HTMLInputElement>(null);
  const { setHeaderMessage, setFooterMessage } = useSystemPrompt();
  const { zoom, zoomFullScreen } = useCamera();
  const { movePiece } = usePiratePiece();
  const { setMovableNodeIdList, setMovableEdgeIdList } = usePirateGraph();
  const { handleShowTimer } = useTimer();
  const { startMarineTurn } = useWhenMarineStartGame();

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

  const handleShowMovableEdges = () => {
    if (cameraZoomInputRef.current) {
      const nodeId = parseInt(cameraZoomInputRef.current.value, 10);
      try {
        // 마린노드의 이웃노드는 파이렛노드라서 반대로 색깔이 바뀌는데 서버에서는 제대로 올거니까 큰 의미없음.
        setMovableEdgeIdList(getNearEdgeIdList(nodeId));
      } catch (e) {
        window.alert("올바른 노드 번호를 입력해라...");
        cameraZoomInputRef.current.value = "";
      }
    }
  };

  const handleSelectPirateLocation = () => {
    const treasures = [36, 45, 175, 185];

    setFooterMessage(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>가령 보물이 {JSON.stringify(treasures)} 노드에 있다고 하자.</div>
        <SelectPirateLocationGrid
          nodeIdListOnTreasures={treasures}
          onSelectLocation={nodeId => {
            window.alert(`${nodeId}를 선택한 당신..`);
            setFooterMessage("");
            zoomFullScreen();
          }}
        />
      </div>,
    );
  };

  const handleStartMarinePlayersSelectNode = (
    marinePlayerKey: MarinePlayerKey,
  ) => {
    setHeaderMessage(`해군 ${marinePlayerKey}은(는) 시작 노드를 골라주세욤`);
    startMarineTurn(marinePlayerKey);
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
          <Button onClick={handleShowMovableEdges}>이웃 간선 ON</Button>
          <Button onClick={() => setMovableEdgeIdList([])}>
            이웃 간선 OFF
          </Button>
          <Button onClick={handleZoomFullScreen}>전체화면</Button>
        </div>
      </Test>
      <Test>
        <Button onClick={handleSelectPirateLocation}>
          해적이 초기 위치를 설정할 수 있는 그리드
        </Button>
      </Test>
      <Test>
        <Button onClick={() => handleShowTimer()}>Timer 소환</Button>
      </Test>
      <Test>
        <Button onClick={() => handleStartMarinePlayersSelectNode("1")}>
          해군 1 은 처음 위치를 골라줘용
        </Button>
        <Button onClick={() => handleStartMarinePlayersSelectNode("2")}>
          해군 2 은 처음 위치를 골라줘용
        </Button>
        <Button onClick={() => handleStartMarinePlayersSelectNode("3")}>
          해군 3 은 처음 위치를 골라줘용
        </Button>
      </Test>
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  position: absolute;
  top: 150px;
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
