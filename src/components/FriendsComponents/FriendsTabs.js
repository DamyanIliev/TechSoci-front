import List from "@components/FriendsComponents/List.js";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const FriendsTabs = () => {
  const { t } = useTranslation();

  const items = [
    {
      key: "1",
      label: t("friends_search"),
      children: <List tab="1" />,
    },
    {
      key: "2",
      label: t("friends_my_friends"),
      children: <List tab="2" />,
    },
    {
      key: "3",
      label: t("friends_req"),
      children: <List tab="3" />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" className="w-screen h-full">
      {items.map((item) => (
        <TabPane key={item.key} tab={item.label}>
          {item.children}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default FriendsTabs;
