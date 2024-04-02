import { Center } from "@react-three/drei";
import UserNft from "./UserNft";
import UserProfile from "./UserProfile";

export default function Page() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection:'column' }}>
      <div>
        <UserProfile />
      </div>
      <div>
        <UserNft />
      </div>
    </div>
  );
}