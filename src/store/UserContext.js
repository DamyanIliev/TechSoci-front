import { getAuthToken, getUserAlias, getUserId } from "@services/auth";
import { customNotifications } from "@services/helpers";
import axios from "axios";
import moment from "moment";
import { createContext, useState } from "react";
import { setUserName, setUserPic } from "./auth";

const UserContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getAllNonStudents = async (courseId) => {
    const id = getUserId();
    try {
      const response = await axios.get(
        `http://localhost:8080/users/get-all-users/${id}`,
        {
          params: { courseId: courseId },
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

  const getStudentCourses = async () => {
    const id = getUserId();
    try {
      const response = await axios.get(
        `http://localhost:8080/users/get-all-courses-for-user/${id}`,
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

  const getUser = async () => {
    const alias = getUserAlias();
    try {
      const response = await axios.get(
        `http://localhost:8080/users/get-user-by-alias/${alias}`
      );
      setUser(response.data);
      return response.data;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };
  const editUser = (
    fullName,
    dateOfBirth,
    faculty,
    facultyNumber,
    profilePicFile
  ) => {
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("dateOfBirth", moment(dateOfBirth).format("YYYY-MM-DD"));
    formData.append("faculty", faculty);
    formData.append("facultyNumber", facultyNumber);
    formData.append("profilePic", profilePicFile);

    axios
      .put(`http://localhost:8080/users/edit-user/${getUserId()}`, formData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        customNotifications("success", response.status, response.data);
        return response.data;
      })
      .catch((error) => {
        customNotifications("error", error.code, error.message);
        return error;
      });
  };
  const contextValue = {
    editUser,
    getUser,
    getAllNonStudents,
    getStudentCourses,
    user,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
