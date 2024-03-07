import "./index.css";

import IngameClient from "./IngameClient";

export default function Page() {
  return (
    <div id="root">
      <IngameClient gameId="123" />
    </div>
  );
}
