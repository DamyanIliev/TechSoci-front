import { getAuthToken, getUserAlias, getUserId } from "@services/auth";
import { customNotifications } from "@services/helpers";
import axios from "axios";
import moment from "moment";
import { createContext, useState } from "react";
import { setUserName, setUserPic } from "./auth";

const CoursesContext = createContext();

export const AppProvider = ({ children }) => {
  const [courses, setCourses] = useState(null);
  const [userCourses, setStudentsInCourse] = useState(null);

  const getTeacherCourses = async () => {
    const id = getUserId();
    try {
      const response = await axios.get(
        `http://localhost:8080/courses/get-courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCourses(response.data);
      return response.data;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const getStudentsForCourse = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/courses/get-students-for-course/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStudentsInCourse(response.data);
      return response.data;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const getUserCourses = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/courses/get-all-courses-for-user-teacher/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const addUserToCourse = async (courseId, studentId) => {
    const formData = new FormData();
    formData.append("studentId", studentId);
    try {
      const response = await axios.put(
        `http://localhost:8080/courses/add-student-to-course/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCourses(response.data);
      return response.data;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const removeUserFromCourse = async (courseId, studentId) => {
    const formData = new FormData();
    formData.append("studentId", studentId);
    try {
      const response = await axios.put(
        `http://localhost:8080/courses/remove-student-from-course/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCourses(response.data);
      return response.data;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const createCourse = async (subj, desc, content) => {
    const id = getUserId();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("description", desc);
    formData.append("subject", subj);
    try {
      const response = await axios.post(
        `http://localhost:8080/courses/create-course/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const contextValue = {
    courses,
    createCourse,
    getTeacherCourses,
    addUserToCourse,
    removeUserFromCourse,
    getUserCourses,
    getStudentsForCourse,
    removeUserFromCourse,
  };

  return (
    <CoursesContext.Provider value={contextValue}>
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesContext;
