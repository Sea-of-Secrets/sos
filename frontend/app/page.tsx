import { cookies } from "next/headers";
import "./index.css";

import Renderer from "./render/Renderer";
import TokenSetter from "./TokenSetter";
import Auth from "./Auth";

export default function Page() {
  return (
    <>
      <TokenSetter
        access={cookies().get("access")}
        refresh={cookies().get("refresh")}
      />
      <Auth>
        <div id="three-container">
          <Renderer />
        </div>
      </Auth>
    </>
  );
}
