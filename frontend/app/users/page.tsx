import Auth from "../Auth";
import UserNft from "./UserNft";
import UserProfile from "./UserProfile";

export default function Page() {
  return (
    <Auth>
      <h1>My Page</h1>
      <UserProfile />
      <UserNft />
    </Auth>
  );
}
