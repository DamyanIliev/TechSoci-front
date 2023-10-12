import PageLayout from "@components/CommonComponents/Layout.js";
import FriendsTabs from "@components/FriendsComponents/FriendsTabs.js";
import "@styles/welcome.css";
import TBD from "@components/CommonComponents/TBD";
import { isAdmin } from "@services/auth";

const Friends = () => {
  return (
    <>
      <PageLayout inner={!isAdmin() ? FriendsTabs : TBD} />
    </>
  );
};

export default Friends;
