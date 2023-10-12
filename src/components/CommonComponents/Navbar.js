import {
  ContainerOutlined,
  HomeOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  RobotOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { clearStorage } from "@services/auth";
import { Menu } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { isAdmin } from "@services/auth";
import Logo from "@resources/images/logo.png";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  const items = [
    getItem(<Link to={"/feed"}>{t("nav_feed")}</Link>, "1", <HomeOutlined />),

    getItem(
      <Link to={"/friends"}>{t("nav_friends")}</Link>,
      "2",
      <TeamOutlined />
    ),

    getItem(
      <Link to={"/profile"}>{t("nav_profile")}</Link>,
      "3",
      <UserOutlined />
    ),
    getItem(
      <Link to={"/posts"}>{t("nav_posts")}</Link>,
      "4",
      <ContainerOutlined />
    ),
    getItem(
      <Link to={"/learning"}>{t("nav_student_help")}</Link>,
      "5",
      <RobotOutlined />
    ),
    getItem(
      <Link to={"/faq"}>{t("nav_faq")}</Link>,
      "10",
      <QuestionCircleOutlined />
    ),

    getItem(
      <Link
        to={"/"}
        onClick={() => {
          clearStorage();
        }}
      >
        {t("nav_logout")}
      </Link>,
      "11",
      <LogoutOutlined />
    ),
  ];

  const adminItems = [
    getItem(
      <Link to={"/learning"}>{t("nav_student_help")}</Link>,
      "5",
      <RobotOutlined />
    ),

    getItem(
      <Link
        to={"/"}
        onClick={() => {
          clearStorage();
        }}
      >
        {t("nav_logout")}
      </Link>,
      "11",
      <LogoutOutlined />
    ),
  ];
  return (
    <>
      <Menu
        mode="inline"
        theme="bright"
        className="bg-[#EAEAEA] text-black"
        collapsed={collapsed.toString()}
        items={!isAdmin() ? items : adminItems}
      />
      <img src={Logo} className=" ml-1 mr-1 mt-60 w-7/8" />
    </>
  );
};
export default Navbar;
