import Auth from "~/app/Auth";
import "./index.css";

import IngameClient from "./IngameClient";
import { Html, useProgress } from "@react-three/drei";
import { Suspense } from "react";
import Loading from "./components/Loading";

export default function Page() {
  return (
    <Auth>
      <div id="three-container">
        <IngameClient />
      </div>
    </Auth>
  );
}
