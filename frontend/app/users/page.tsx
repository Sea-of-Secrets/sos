import Auth from "../Auth";
import UserNft from "./UserNft";
import UserProfile from "./UserProfile";

export default function Page() {
  return (
    <Auth>
      <UserProfile />
      <UserNft />
    </Auth>
  );
}
