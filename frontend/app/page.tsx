import { cookies } from "next/headers";
import "./index.css";

import Renderer from "./render/Renderer";
import Temp from "./Temp";

export default function Page() {
  return (
    <>
      <div id="three-container">
        <Renderer />
      </div>
      <Temp token={cookies().get("access")} />
    </>
  );
}
