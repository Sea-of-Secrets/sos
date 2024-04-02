import Auth from "~/app/Auth";
import "./index.css";

import IngameClient from "./IngameClient";

export default function Page() {
  return (
    <Auth>
      <div id="three-container">
        <IngameClient />
      </div>
    </Auth>
  );
}
