import { AuthClient } from "~/app/auth/AuthClient";
import Index from "./index";
import "./index.css";
import Renderer from "./Renderer";

export default function Page() {
  return (
    <AuthClient>
      <div id="container">
        <div id="index-container">
          <Index />
        </div>
        <div id="three-container">
          <Renderer />
        </div>
      </div>
    </AuthClient>
  );
}
