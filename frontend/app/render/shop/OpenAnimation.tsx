import { useCallback, useEffect, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopRepeat } from "three";
import { useGatcha } from "../stores/useGatch";
import { mockGatcha } from "./mock";
import { useShopModal } from "./useShopModal";
import { GatchaType } from "~/app/auth/types";

export default function Open() {
  const { gatchaState } = useGatcha();
  const [loading, setLoading] = useState(false);
  const { scene, animations } = useGLTF("/gatcha_box/scene.gltf");
  const { actions } = useAnimations(animations, scene);
  const { randomGatcha, setRandomGatcha } = useShopModal();

  const fetchGatcha = useCallback(async () => {
    mockGatcha().then(data => {
      setRandomGatcha(data as GatchaType);
      console.log(data);
      return;
    }); // 돈 계속 빠져나가서 만든 테스트용 함수
    setLoading(false);
  }, [setRandomGatcha]);

  useEffect(() => {
    if (gatchaState !== "GATCHA_READY") {
      return;
    }

    if (loading) {
      const action2 = actions["ChestBody|Chest_Shake"];
      if (action2) {
        action2.setLoop(LoopRepeat, 10).play().setDuration(2);
        // action2.reset().setDuration(3).play().setLoop(LoopOnce, 0);
      }
    }

    if (!loading && !randomGatcha) {
      fetchGatcha();
    }

    // Chest_Up|Chest_Open_Close // ChestBody|Chest_Rotation // ChestBody|Chest_Shake
    // const action1 = actions["ChestBody|Chest_Rotation"];
    // if (action1) {
    //   action1.reset().setDuration(3).play().setLoop(LoopOnce, 0);
    // }

    // const action3 = actions["Chest_Up|Chest_Open_Close"];
    // if (action3) {
    //   action3.reset().setDuration(3).play().setLoop(LoopOnce, 0);
    // }

    // setTimeout(() => {
    //   // Chest_Up|Chest_Open_Close // ChestBody|Chest_Rotation // ChestBody|Chest_Shake
    //   // const action1 = actions["ChestBody|Chest_Rotation"];
    //   // if (action1) {
    //   //   action1.reset().setDuration(3).play().setLoop(LoopOnce, 0);
    //   // }

    //   const action2 = actions["ChestBody|Chest_Shake"];
    //   if (action2) {
    //     action2.setLoop(LoopRepeat, 10).play().setDuration(2);
    //     // action2.reset().setDuration(3).play().setLoop(LoopOnce, 0);
    //   }

    //   // const action3 = actions["Chest_Up|Chest_Open_Close"];
    //   // if (action3) {
    //   //   action3.reset().setDuration(3).play().setLoop(LoopOnce, 0);
    //   // }
    // }, 1000);
  }, [actions, fetchGatcha, gatchaState, loading, randomGatcha]);

  return (
    <mesh
      rotation={[-Math.PI / 5, -44.5, 0]}
      position={[-50000, 119900, -168600]}
      scale={600}
      visible={gatchaState === "GATCHA_READY"}
    >
      <primitive object={scene} />
    </mesh>
  );
}

// const fetchGatchData = useCallback(async () => {
//   if (loading || randomGatchaData) {
//     return;
//   }
//   setLoading(true);
//   mockGatcha().then(data => setRandomGatchaData(data)); // 돈 계속 빠져나가서 만든 테스트용 함수

//   // TODO: 배포시에는 이걸 사용해주세용
//   // ShopsApi.postGatcha()
//   //   .then(res => setRandomGatchaData(res.data))
//   //   .catch(e => {
//   //     console.error("지갑없음!");
//   //   });

//   // // 가챠 뽑고 유저 데이터 업데이트
//   // UsersApi.getUserInfo()
//   //   .then(res => {
//   //     if (validateUser(res.data)) {
//   //       setUser(res.data);
//   //     }
//   //   })
//   //   .catch(e => {
//   //     console.error("fetch fail user");
//   //   });

//   // UsersApi.getWallet()
//   //   .then(res => {
//   //     if (validateNftListData(res.data)) {
//   //       setNftList(res.data);
//   //     }
//   //   })
//   //   .catch(e => console.error("fetch fail nftList"));

//   setLoading(false);
// }, [loading, randomGatchaData, setNftList, setUser]);
