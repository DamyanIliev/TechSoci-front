import PageLayout from "@components/CommonComponents/Layout.js";
import EditProfile from "@components/ProfileComponents/EditProfile.js";
import "@styles/welcome.css";
import TBD from "@components/CommonComponents/TBD";
import { isAdmin } from "@services/auth";

const Profile = () => {
  return (
    <>
      <PageLayout inner={!isAdmin() ? EditProfile : TBD} />
    </>
  );
};

export default Profile;
