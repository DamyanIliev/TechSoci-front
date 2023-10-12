import { Button, Card, Table } from "antd";
import { useContext, useEffect, useState, useTransition } from "react";
import CoursesContext from "@services/CoursesContext";
import UserContext from "@services/UserContext";
import { isAdmin } from "@services/auth";
import CalendarNot from "./CalendarNot";
import DragNDropMaterials from "./DragNDropMaterials";
import { useTranslation } from "react-i18next";

const SubjectLayout = (props) => {
  const { t } = useTranslation();
  const course = props.course;
  const { getAllNonStudents } = useContext(UserContext);
  const { addUserToCourse, getStudentsForCourse, removeUserFromCourse } =
    useContext(CoursesContext);
  const [tabPosition, setTabPosition] = useState("left");
  const [nonStudents, setNonStudents] = useState([]);
  const [students, setStudentsInCourse] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const columns = [
    {
      title: t("students_name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("students_faculty"),
      dataIndex: "faculty",
      key: "faculty",
    },
    {
      title: t("students_facultyNumber"),
      dataIndex: "facultyNumber",
      key: "facultyNumber",
    },
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <Button
          className="btn btn-primary border-green-500 bg-green-500 text-white font-semibold hover:bg-green-500 hover:text-white mr-3"
          onClick={() => handleAction(record)}
        >
          {t("students_enroll")}
        </Button>
      ),
    },
  ];

  const studentsCols = [
    {
      title: t("students_name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("students_faculty"),
      dataIndex: "faculty",
      key: "faculty",
    },
    {
      title: t("students_facultyNumber"),
      dataIndex: "facultyNumber",
      key: "facultyNumber",
    },
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <Button
          className="btn btn-secondary bg-custRed hover:border-custRed text-white font-semibold"
          onClick={() => handleRemove(record)}
        >
          {t("students_remove")}
        </Button>
      ),
    },
  ];

  const handleAction = (record) => {
    addUserToCourse(course.courseId, record.userId);
    setNonStudents([]);
    setTrigger((prev) => !prev);
  };
  const handleRemove = (record) => {
    removeUserFromCourse(course.courseId, record.userId);
    setStudentsInCourse([]);
    setTrigger((prev) => !prev);
  };

  useEffect(() => {
    if (isAdmin()) {
      getAllNonStudents(course.courseId).then((resp) => {
        if (resp.length > students.length) {
          setNonStudents(resp);
        } else if (nonStudents.length === 0 || nonStudents.length === 1) {
          setNonStudents(resp);
        }
      });
      getStudentsForCourse(course.courseId).then((resp) => {
        if (resp.length > nonStudents.length) {
          setStudentsInCourse(resp);
        } else if (nonStudents.length === 0 || nonStudents.length === 1) {
          setStudentsInCourse(resp);
        }
      });
    }
  }, [students.length, nonStudents.length]);

  return (
    <>
      <div className="flex">
        <div className="w-1/3 mr-4">
          <Card>{course.description}</Card>
          <div className="mt-3">
            <DragNDropMaterials />
          </div>
        </div>
        <div className="w-1/3">
          <CalendarNot />
        </div>
      </div>
      {isAdmin() && (
        <div>
          <h1 className="font-semibold text-xl">{t("students_nonStudents")}</h1>
          <Table columns={columns} dataSource={nonStudents} />
          <h1 className="font-semibold text-xl"> {t("students_students")}</h1>
          <Table columns={studentsCols} dataSource={students} />
        </div>
      )}
    </>
  );
};
export default SubjectLayout;
