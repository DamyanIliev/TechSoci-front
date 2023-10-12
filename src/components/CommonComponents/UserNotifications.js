import bg from "@images/bg.png";
import en from "@images/en.png";
import {
  getLikes,
  getNewComments,
  getUserName,
  getUserPic,
} from "@services/auth";
import { base64ToFile } from "@services/helpers";
import "@styles/welcome.css";
import { Avatar, Badge, Card, Input, Switch, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
const { TextArea } = Input;
const { Meta } = Card;

const UserNotifications = (props) => {
  const { t, i18n } = useTranslation();
  const profilePic = getUserPic(),
    name = getUserName();

  const currentLangTern = () => {
    return i18n.language == "en" ? "bg" : "en";
  };

  const handleLanguageChange = () => {
    currentLang = currentLangTern();
    i18n.changeLanguage(currentLang);
  };

  let currentLang = "en";
  let likesCount = getLikes();
  let commentsCount = getNewComments();

  return (
    <>
      <div className="fixed right-8 ml-12 w-1/4 justify-items-end ">
        <div className="grid justify-items-end">
          <Card className="w-fit">
            <Meta
              avatar={
                <div className="flex justify-end">
                  <Tooltip title={t("notifications_fr_req")} placement="left">
                    <Badge count={5} overflowCount={10} className="mr-4">
                      <Avatar
                        src={URL.createObjectURL(base64ToFile(profilePic))}
                        size={64}
                      />
                    </Badge>
                  </Tooltip>
                </div>
              }
              title={<strong className="text-right">{name}</strong>}
              description={
                <div>
                  <Tooltip title={t("notifications_likes")} placement="bottom">
                    <Badge
                      count={likesCount}
                      showZero
                      color="#99BB33"
                      className="mr-2 cursor-pointer"
                    />
                  </Tooltip>
                  <Tooltip title={t("notifications_comm")} placement="bottom">
                    <Badge
                      count={commentsCount}
                      showZero
                      color="#faad14"
                      className="mr-2 cursor-pointer"
                    />
                  </Tooltip>
                  <Switch
                    className="bg-custBei"
                    onChange={handleLanguageChange}
                    unCheckedChildren={<img src={bg} className="w-5 h-5" />}
                    checkedChildren={
                      <img src={en} className="w-5 h-5 mt-0.5" />
                    }
                  />
                </div>
              }
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserNotifications;
