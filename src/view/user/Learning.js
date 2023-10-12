import PageLayout from "@components/CommonComponents/Layout.js";
import SubjectsTabs from "@components/LearningComponents/SubjectsTabs.js";
import "@styles/welcome.css";

const Feed = () => {
  return (
    <>
      <PageLayout inner={SubjectsTabs} />
    </>
  );
};

export default Feed;
