import {
  collection,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  getDoc,
} from "firebase/firestore";

import { db } from "@root/firebase";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Card, Tooltip, Button, Input } from "antd";
import { WechatFilled, CloseOutlined, SendOutlined } from "@ant-design/icons";
import FriendsGroup from "./FriendsGroup";
import FriendsContext from "@services/FriendsContext";
import { getUserAlias } from "@services/auth";
import { customNotifications } from "@services/helpers";
import { useTranslation } from "react-i18next";

const { Meta } = Card;
const { TextArea } = Input;

const ChatSection = () => {
  const [showChat, setShowChat] = useState(true);
  const [chat, setChat] = useState([]);
  const [friend, setFriend] = useState("");
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [documentId1, setDocId1] = useState("");
  const [documentId2, setDocId2] = useState("");
  const [trigger, setTrigger] = useState(false);
  const chatContainerRef = useRef(null);

  const { t } = useTranslation();
  const meUser = getUserAlias();

  const { myFriends, getFriends } = useContext(FriendsContext);

  async function checkDocumentExists(documentPath) {
    const documentRef = doc(db, documentPath);
    const documentSnapshot = await getDoc(documentRef);

    return documentSnapshot.exists();
  }

  const addIfChatExists = async (docPath, obj) => {
    try {
      const exists = await checkDocumentExists(docPath);
      if (exists) {
        const documentRef = doc(db, docPath);
        await updateDoc(documentRef, {
          chat: arrayUnion(obj),
        });
        setTrigger((tr) => (tr = !tr));
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    getFriends().then((resp) => {
      if (resp.length > 0) {
        handleDataFromChild(resp[0].alias);
      }
    });
  }, []);

  useEffect(() => {
    const messagesCollection = collection(db, "messages");
    getDocs(messagesCollection)
      .then((querySnapshot) => {
        const found = querySnapshot.docs.find(
          (doc) => doc.id === documentId1 || doc.id === documentId2
        );
        if (found) {
          setChat(found.data().chat);
          setChatId(found.id);
        } else {
          setChat([]);
          setChatId("");
        }
      })
      .catch((error) => {
        customNotifications("error", error.code, error.message);
      });
  }, [friend, trigger]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const lastMessage = chatContainer.lastElementChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      customNotifications("error", t("error_"), t("error_message_empty"));
      return;
    }
    let obj = {
      text: message,
      name: meUser,
      createdAt: Date.now(),
    };
    if (chatId) {
      const documentPath1 = `messages/${chatId}`;
      addIfChatExists(documentPath1, obj);
    } else {
      const documentPath1 = `messages/${meUser + "-" + friend}`;

      const documentRef1 = doc(db, documentPath1);

      await setDoc(
        documentRef1,
        {
          chat: [obj],
        },
        { merge: true }
      );
      setTrigger((tr) => (tr = !tr));
    }

    setMessage("");
  };

  const handleDataFromChild = (data) => {
    setFriend(data);
    setDocId1(meUser + "-" + data);
    setDocId2(data + "-" + meUser);
    setShowChat(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      sendMessage(event);
    }
  };

  const convertToDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return formattedDate + " " + formattedTime;
  };

  return (
    <div className="fixed sm:bottom-2 lg:bottom-36 md:bottom-20 right-4 md:ml-12 md:w-1/4">
      {showChat && (
        <FriendsGroup
          sendDataToParent={handleDataFromChild}
          friends={myFriends}
        />
      )}
      {chat && chat.length > 0 && showChat && (
        <div className="shadow-lg">
          <Card
            title={friend}
            actions={[
              <div className="m-3 flex items-center" key="chat-input">
                <TextArea
                  onKeyDown={handleKeyDown}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder=""
                  className="resize-none w-full p-2"
                  rows={2}
                />
                <SendOutlined
                  className="m-2"
                  onClick={(event) => sendMessage(event)}
                />
              </div>,
            ]}
          >
            <div
              className="overflow-y-auto h-64 md:h-52 no-scrollbar"
              ref={chatContainerRef}
            >
              {chat.map((convo, index) => (
                <div key={index}>
                  {meUser === convo.name ? (
                    <div style={{ textAlign: "right" }}>
                      <strong className="mr-2">{convo.name}</strong>
                      <div className="border-2 rounded-t-full rounded-bl-full mt-1 w-fit ml-auto bg-custBei">
                        <Card.Meta
                          className="p-2"
                          description={
                            <div>
                              <p style={{ textAlign: "right" }}>{convo.text}</p>
                            </div>
                          }
                        />
                      </div>
                      <span className="text-xs text-gray-400">
                        {convertToDateTime(convo.createdAt)}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <strong className="ml-2 z-10">{convo.name}</strong>
                      <div className="border-2 rounded-t-full rounded-br-full mt-1 w-fit flex justify-between bg-white">
                        <Card.Meta
                          className="p-2"
                          description={
                            <div>
                              <p>{convo.text}</p>
                            </div>
                          }
                        />
                      </div>
                      <span className="text-xs text-gray-400">
                        {convertToDateTime(convo.createdAt)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {(!chat || chat.length === 0) && showChat && (
        <div className="shadow-lg">
          <Card
            title={<span className="font-bold text-custNavy">{friend}</span>}
            actions={[
              <div className="m-3 flex items-center" key="chat-input">
                <TextArea
                  disabled={myFriends.length === 0}
                  onKeyDown={handleKeyDown}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder=""
                  allowClear
                  autoSize={{
                    minRows: 2,
                    maxRows: 3,
                  }}
                />
                {myFriends != 0 && (
                  <SendOutlined
                    className="m-2"
                    onClick={(event) => sendMessage(event)}
                  />
                )}
              </div>,
            ]}
          >
            {myFriends.length == 0 ? (
              <span className="font-semibold text-transparent  bg-clip-text bg-gradient-to-r from-blue-500 to-custOrange">
                {t("chat_find_friends")}
              </span>
            ) : (
              <span className="font-semibold text-transparent  bg-clip-text bg-gradient-to-r from-custOrange to-green-600">
                {t("chat_no_convo")}
              </span>
            )}
          </Card>
        </div>
      )}

      <Tooltip title={!showChat ? "open" : "close"}>
        <Button
          className="fixed bottom-4 right-4 bg-custGreen w-14 h-14"
          type="primary"
          shape="circle"
          size="large"
          icon={
            !showChat ? (
              <WechatFilled style={{ fontSize: "26px" }} />
            ) : (
              <CloseOutlined style={{ fontSize: "26px" }} />
            )
          }
          onClick={() => setShowChat(!showChat)}
        />
      </Tooltip>
    </div>
  );
};

export default ChatSection;
