import PageLayout from "@components/CommonComponents/Layout.js";
import TBD from "@components/CommonComponents/TBD";
import FAQComp from "@components/FAQComponents/FAQComp.js";
import "@styles/welcome.css";
import { isAdmin } from "@services/auth";

const FAQ = () => {
  return (
    <>
      <PageLayout inner={!isAdmin() ? FAQComp : TBD} />
    </>
  );
};

export default FAQ;
