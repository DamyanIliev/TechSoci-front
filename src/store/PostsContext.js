import { getAuthToken, getUserId } from "@services/auth";
import { createContext, useState } from "react";

import { customNotifications } from "@services/helpers";
import axios from "axios";

const PostsContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getUserPosts = async () => {
    const id = getUserId();
    try {
      const response = await axios.get(
        `http://localhost:8080/posts/get-user-posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const getTimelinePosts = async () => {
    const id = getUserId();
    try {
      const response = await axios.get(
        `http://localhost:8080/posts/get-timeline/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/posts/delete-post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      return response;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const createPost = async (desc, pic) => {
    const formData = new FormData();
    formData.append("content", pic ? pic : new File([""], "nullFile"));
    formData.append("description", desc);
    try {
      const response = await axios.post(
        `http://localhost:8080/posts/create-post/${getUserId()}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const editPost = async (text, id) => {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("id", id);
    try {
      const response = await axios.put(
        `http://localhost:8080/posts/edit-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
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

  const likePost = async (postId) => {
    const formData = new FormData();
    formData.append("postId", postId);
    try {
      const response = await axios.put(
        `http://localhost:8080/posts/like-post`,
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

  const unlikePost = async (postId) => {
    const formData = new FormData();
    formData.append("postId", postId);
    try {
      const response = await axios.put(
        `http://localhost:8080/posts/unlike-post`,

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

  const contextValue = {
    posts,
    getTimelinePosts,
    getUserPosts,
    deletePost,
    createPost,
    editPost,
    likePost,
    unlikePost,
  };

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
