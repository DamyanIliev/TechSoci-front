import ChangePassword from "@components/WelcomeComponents/ChangePassword.js";
import Login from "@components/WelcomeComponents/Login.js";
import "@styles/welcome.css";
import Logo from "@resources/images/logo.png";
import { Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const toggleShowLogin = () => {
    setShowLogin((p) => !p);
  };
  const togglePassword = () => {
    setShowChangePassword((p) => !p);
  };

  const goToSignup = () => {
    navigate("/signup");
  };
  return (
    <>
      <div className="split left"></div>
      <div className="split right overflow-hidden	">
        <div className="center">
          <div className="btns-center">
            <img src={Logo} className="w-7/8" />
            <p className="italic text-white">
              <span className="font-bold	">"{t("welcome_msg1")}"</span>
              {t("welcome_msg2")}
            </p>
            <Button
              type="primary"
              size="large"
              className="mt-4 bg-custGreen"
              onClick={goToSignup}
            >
              {t("welcome_signup")}
            </Button>
            <Button
              type="text text-white"
              size="large"
              className="mt-4 hover:bg-custGreen"
              onClick={toggleShowLogin}
            >
              {t("welcome_login")}
            </Button>
            <Login show={showLogin} toggleShow={toggleShowLogin} />
          </div>
          <p
            className="text-xs text-customCream hover:text-custGreen text-center mt-2 cursor-pointer"
            onClick={togglePassword}
          >
            {t("welcome_forgot_password")}
          </p>
          <ChangePassword
            show={showChangePassword}
            toggleShow={togglePassword}
          />
        </div>
      </div>
    </>
  );
};

export default Welcome;
