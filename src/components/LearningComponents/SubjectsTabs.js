import CoursesContext from "@services/CoursesContext";
import { Button, Card, Input, Tabs } from "antd";
import { useContext, useEffect, useState } from "react";
import UserContext from "@services/UserContext";
import { isAdmin } from "@services/auth";
import DragNDropMaterials from "./DragNDropMaterials";
import SubjectLayout from "./SubjectLayout";
import { useTranslation } from "react-i18next";
const { TextArea } = Input;

const SubjectsTabs = () => {
  const { t } = useTranslation();
  const { createCourse, courses, getTeacherCourses } =
    useContext(CoursesContext);
  const { getStudentCourses } = useContext(UserContext);
  const [tabPosition, setTabPosition] = useState("left");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [items, setItems] = useState([]);
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  useEffect(() => {
    if (isAdmin()) {
      getTeacherCourses().then((resp) => {
        if (resp.length > 0) {
          resp.map((course) => {
            const item = {
              key: course.courseId,
              label: course.subject,
              children: <SubjectLayout course={course} />,
            };
            setItems((curr) => [...curr, item]);
          });
        }
      });
    } else {
      getStudentCourses().then((resp) => {
        if (resp.length > 0) {
          resp.map((course) => {
            const item = {
              key: course.courseId,
              label: course.subject,
              children: <SubjectLayout course={course} />,
            };
            setItems((curr) => [...curr, item]);
          });
        }
      });
    }
  }, [trigger]);

  const handleChildData = (data) => {
    console.log("Received data from child:", data);
    setFile(data);
  };

  const create = () => {
    createCourse(subject, description, file).then(() => {});
    setTrigger((curr) => !curr);
    setItems([]);
  };

  return (
    <>
      <Tabs tabPosition="left" items={items} />
      {isAdmin() && (
        <div className="fixed sm:bottom-1 lg:bottom-30 md:bottom-20 right-4 md:ml-12 md:w-1/4">
          <Card
            title={t("students_add")}
            bordered={false}
            style={{
              width: 400,
            }}
          >
            <Input
              placeholder={t("students_subj")}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <TextArea
              className="mt-2"
              placeholder={t("students_desc")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="mt-3">
              <DragNDropMaterials onData={handleChildData} />
            </div>
            <div className="flex justify-center mt-2">
              <Button className="mx-auto" onClick={create}>
                {t("common_submit")}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default SubjectsTabs;
