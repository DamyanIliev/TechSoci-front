import PageLayout from "@components/CommonComponents/Layout.js";
import TBD from "@components/CommonComponents/TBD";
import FeedPosts from "@components/FeedComponents/FeedPosts.js";
import "@styles/welcome.css";
import { isAdmin } from "@services/auth";

const Posts = () => {
  return (
    <>
      <PageLayout inner={!isAdmin() ? FeedPosts : TBD} canEdit="true" />
    </>
  );
};

export default Posts;
