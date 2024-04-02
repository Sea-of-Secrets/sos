import { cookies } from "next/headers";
import "./index.css";

import Renderer from "./render/Renderer";
import TokenSetter from "./TokenSetter";

export default function Page() {
  return (
    <>
      <div id="three-container">
        <Renderer />
      </div>
      <TokenSetter
        access={cookies().get("access")}
        refresh={cookies().get("refresh")}
      />
    </>
  );
}
