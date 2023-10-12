import "@styles/welcome.css";
import { Result } from "antd";
import { useTranslation } from "react-i18next";

const TBD = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto w-1/2">
      <Result status="404" title="404" subTitle={t("to_be_developed")} />
    </div>
  );
};

export default TBD;
