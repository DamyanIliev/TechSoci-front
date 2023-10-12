import { getAuthToken, getUserId } from "@services/auth";
import { customNotifications } from "@services/helpers";
import axios from "axios";
import { createContext, useEffect } from "react";

const CommentsContext = createContext();

export const AppProvider = ({ children }) => {
  const createComment = async (postId, text) => {
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("text", text);
    try {
      const response = await axios.post(
        `http://localhost:8080/comments/create-comment/${getUserId()}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/comments/delete-comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const getComments = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/comments/get-comments`,
        {
          params: { postId: postId },
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  useEffect(() => {}, []);

  const contextValue = {
    createComment,
    deleteComment,
    getComments,
  };

  return (
    <CommentsContext.Provider value={contextValue}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContext;
