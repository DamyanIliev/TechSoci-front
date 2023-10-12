import { GithubOutlined } from "@ant-design/icons";
import { Layout, Spin } from "antd";
import { useState, useEffect } from "react";
import Navbar from "@components/CommonComponents/Navbar.js";
import Chat from "@components/CommonComponents/Chat.js";
import UserNotifications from "@components/CommonComponents/UserNotifications.js";
import "@styles/welcome.css";
import { useTranslation } from "react-i18next";
import { isAdmin } from "@services/auth";

const { Header, Content, Footer, Sider } = Layout;

const PageLayout = (props) => {
  const { t } = useTranslation();

  const Inner = props.inner;
  const [collapsed, setCollapsed] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="bg-[#EAEAEA]"
      >
        <div className="demo-logo-vertical" />
        <Navbar />
      </Sider>
      <Layout className="flex flex-col">
        <Header className="bg-transparent">
          <UserNotifications />
        </Header>
        <Content className="flex-1 p-4">
          <div className="flex flex-col md:flex-row">
            {loading ? (
              <Spin className="m-auto w-1/2" size="large" />
            ) : (
              <>
                {Inner.name == "FeedPosts" ? (
                  <Inner canEdit={props.canEdit} />
                ) : (
                  <Inner />
                )}
                {!isAdmin() ? <Chat /> : null}
              </>
            )}
          </div>
        </Content>
        <Footer className="text-center font-semibold text-xs">
          <p>{t("common_copyright1")}</p>
          <p>{t("common_copyright2")}</p>
          <p>
            <a href="" target="_blank">
              <GithubOutlined />
            </a>
          </p>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
