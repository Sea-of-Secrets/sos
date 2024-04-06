import "./index.css";

import IngameClient from "./IngameClient";
import { Html, useProgress } from "@react-three/drei";
import { Suspense } from "react";
import Loading from "./components/Loading";
import { AuthClient } from "~/app/auth/AuthClient";

export default function Page() {
  return (
    <AuthClient>
      <div id="three-container">
        <IngameClient />
      </div>
    </AuthClient>
  );
}
