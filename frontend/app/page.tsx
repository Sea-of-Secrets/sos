import "./index.css";

import { AuthClient } from "./auth/AuthClient";
import Renderer from "./render/Renderer";

export default function Page() {
  return (
    <AuthClient>
      <div id="three-container">
        <Renderer />
      </div>
    </AuthClient>
  );
}
