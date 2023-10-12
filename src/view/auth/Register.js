import { ArrowLeftOutlined } from "@ant-design/icons";
import RegisterForm from "@components/WelcomeComponents/RegisterForm.js";
import "@styles/welcome.css";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <Card
        className="bg-customCream/90"
        title={t("welcome_signup")}
        extra={
          <ArrowLeftOutlined
            className="bg-custGreen p-2 rounded-full            "
            onClick={() => navigate(-1)}
          />
        }
        bordered={false}
        style={{
          width: 700,
        }}
      >
        <RegisterForm />
      </Card>
    </div>
  );
};

export default Register;
