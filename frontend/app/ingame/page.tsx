import "./index.css";

import IngameClient from "./IngameClient";

export default function Page() {
  return (
    <div id="three-container">
      <IngameClient gameId="123" />
    </div>
  );
}
