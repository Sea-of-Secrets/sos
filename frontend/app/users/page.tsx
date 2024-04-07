import { AuthClient } from "../auth/AuthClient";
import UserNft from "./UserNft";
import UserProfile from "./UserProfile";

export default function Page() {
  return (
    <AuthClient>
      <UserProfile />
      <UserNft />
    </AuthClient>
  );
}
