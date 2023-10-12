import { Badge, Calendar, Card, theme, Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isAdmin } from "store/auth";
const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const CalendarNot = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const [cardVisible, setCardVisibility] = useState(false);
  const [content, setContent] = useState([]);
  const [dateKey, setDateKey] = useState("");

  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const notifications = {
    "20/06/2023": ["Exam Algebra", "Lecture LinearAlgebra", "Test training"],
    "12/06/2023": ["Geometry exam", "Presentation"],
  };

  useEffect(() => {}, []);
  const dateCellRender = (date) => {
    let dateKey1 = date.format("DD/MM/YYYY");
    const notificationCount = notifications[dateKey1]
      ? notifications[dateKey1].length
      : null;
    if (notificationCount && !isAdmin()) {
      return (
        <div>
          {date.format("D")}
          <Badge
            count={notificationCount}
            onClick={() => {
              setCardVisibility(true);
              setDateKey(dateKey1);
              setContent(notifications[dateKey1]);
            }}
          />
        </div>
      );
    }

    return date.format("D");
  };

  return (
    <div className="">
      <div style={wrapperStyle} className=" mb-3">
        <Calendar
          fullscreen={false}
          onPanelChange={onPanelChange}
          fullCellRender={dateCellRender}
        />
      </div>
      {isAdmin() && (
        <div>
          <Tooltip title={t("feature_not_available")}>
            <Button>{t("students_add_notif")}</Button>
          </Tooltip>
        </div>
      )}
      <div className="w-3/5">
        {cardVisible && (
          <Card title={dateKey}>
            {content.map((c) => {
              return <p className="font-semibold text-green-500">📚 {c}</p>;
            })}
          </Card>
        )}
      </div>
    </div>
  );
};

export default CalendarNot;
