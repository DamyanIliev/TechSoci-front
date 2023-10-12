import axios from "axios";
import { customNotifications } from "@services/helpers";
export const getAuthToken = () => {
  return sessionStorage.getItem("authToken");
};
export const setAuthToken = (jwt) => {
  return sessionStorage.setItem("authToken", jwt);
};
export const setUserEmail = (email) => {
  return sessionStorage.setItem("email", email);
};
export const getUserEmail = () => {
  return sessionStorage.getItem("email");
};
export const setUserId = (userId) => {
  return sessionStorage.setItem("userId", userId);
};
export const getUserId = () => {
  return sessionStorage.getItem("userId");
};

export const setUserAlias = (alias) => {
  return sessionStorage.setItem("alias", alias);
};
export const getUserAlias = () => {
  return sessionStorage.getItem("alias");
};

export const setUserName = (name) => {
  return sessionStorage.setItem("name", name);
};
export const getUserName = () => {
  return sessionStorage.getItem("name");
};

export const setUserPic = (pic) => {
  return sessionStorage.setItem("profilePic", pic);
};
export const getUserPic = () => {
  return sessionStorage.getItem("profilePic");
};

export const setLikes = (num) => {
  return sessionStorage.setItem("likes", num);
};
export const getLikes = () => {
  return sessionStorage.getItem("likes");
};

export const setNewComments = (num) => {
  return sessionStorage.setItem("comments", num);
};
export const getNewComments = () => {
  return sessionStorage.getItem("comments");
};

export const setUserRole = (role) => {
  return sessionStorage.setItem("role", role);
};
export const getUserRole = () => {
  return sessionStorage.getItem("role");
};

export const isAdmin = () => {
  return sessionStorage.getItem("role") === "ROLE_ADMIN";
};

export const clearStorage = () => {
  sessionStorage.clear();
};

export const authenticate = async (email, password) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  try {
    const response = await axios.post(
      "http://localhost:8080/auth/login",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAuthToken(response.data.jwt);
    setUserEmail(response.data.email);
    setUserId(response.data.userId);
    setUserAlias(response.data.alias);
    setUserName(response.data.name);
    setUserPic(response.data.profilePic);
    setLikes(response.data.likeNotifications);
    setNewComments(response.data.commentNotifications);
    setUserRole(response.data.role);
    return response;
  } catch (error) {
    customNotifications("error", error.code, error.message);
    return error;
  }
};

export const register = async (
  nickname,
  fullName,
  email,
  password,
  dateOfBirth,
  faculty,
  facultyNumber,
  profilePicFile
) => {
  const formData = new FormData();
  formData.append("alias", nickname);
  formData.append("name", fullName);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("dateOfBirth", dateOfBirth);
  formData.append("faculty", faculty);
  formData.append("facultyNumber", facultyNumber !== "0" ? facultyNumber : null);
  formData.append("profilePic", profilePicFile);

  try {
    const response = await axios.post(
      "http://localhost:8080/users/create-user",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    customNotifications("success", response.status, response.data);
    return response;
  } catch (error) {
    customNotifications("error", error.code, error.message);
    return error;
  }
};
