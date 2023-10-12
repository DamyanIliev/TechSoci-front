import React, { createContext, useState, useEffect } from "react";
import { customNotifications } from "@services/helpers";
import { getUserId, getAuthToken } from "@services/auth";
import axios from "axios";

const FriendsContext = createContext();

export const AppProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [requests, setRequests] = useState([]);

  const getPeople = async () => {
    const userId = getUserId();
    try {
      const response = await axios.get(
        `http://localhost:8080/friends/get-non-friends/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      setPeople(response.data);
      return response.data;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const getFriends = async () => {
    const userId = getUserId();
    try {
      const response = await axios.get(
        `http://localhost:8080/friends/get-friends/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      setMyFriends(response.data);
      return response.data;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const getRequests = async () => {
    const userId = getUserId();
    try {
      const response = await axios.get(
        `http://localhost:8080/friends/get-requests/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      setRequests(response.data);
      return response.data;
    } catch (error) {
      customNotifications("error", error.code, error.message);
      return error;
    }
  };

  const sendFriendRequest = async (friendUserId) => {
    const id = getUserId();
    const formData = new FormData();
    formData.append("friendUserId", friendUserId);
    try {
      const response = await axios.post(
        `http://localhost:8080/friends/send-request/${id}`,
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

  const acceptFriendRequest = async (friendUserId) => {
    const id = getUserId();
    const formData = new FormData();
    formData.append("friendUserId", id);
    try {
      const response = await axios.put(
        `http://localhost:8080/friends/accept-request/${friendUserId}`,
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

  const declineFriendRequest = async (friendId) => {
    const id = getUserId();
    const formData = new FormData();
    formData.append("friendUserId", id);
    try {
      const response = await axios.put(
        `http://localhost:8080/friends/decline-request/${friendId}`,
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

  const removeFriendRequest = async (friendId) => {
    const id = getUserId();
    const formData = new FormData();
    formData.append("friendUserId", friendId);
    try {
      const response = await axios.put(
        `http://localhost:8080/friends/remove-friend/${id}`,
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

  const blockUser = async (friendId) => {
    const id = getUserId();
    const formData = new FormData();
    formData.append("friendId", friendId);
    try {
      const response = await axios.post(
        `http://localhost:8080/friends/block-user/${id}`,
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

  useEffect(() => {}, []);

  const contextValue = {
    people,
    requests,
    myFriends,
    getPeople,
    getFriends,
    getRequests,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriendRequest,
    blockUser,
  };

  return (
    <FriendsContext.Provider value={contextValue}>
      {children}
    </FriendsContext.Provider>
  );
};

export default FriendsContext;
