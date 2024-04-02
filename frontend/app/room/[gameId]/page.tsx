import Auth from "~/app/Auth";
import Index from "./index";
import "./index.css";
import Renderer from "./Renderer";

export default function Page() {
  return (
    <Auth>
      <div id="container">
        <div id="index-container">
          <Index />
        </div>
        <div id="three-container">
          <Renderer />
        </div>
      </div>
    </Auth>
  );
}
