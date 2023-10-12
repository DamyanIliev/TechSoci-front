import FriendsContext from "@services/FriendsContext";
import { getUserId } from "@services/auth";
import { base64ToFile } from "@services/helpers";
import { Avatar, Button, Divider, Input, List, Skeleton } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { isAdmin } from "@services/auth";
const ListComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [requested, setRequested] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [friends, setFriends] = useState([]);
  const [reloadComponent, setReloadComponent] = useState(false);

  const {
    getPeople,
    getFriends,
    getRequests,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriendRequest,
  } = useContext(FriendsContext);

  const { t } = useTranslation();

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
  };
  useEffect(() => {
    loadMoreData();

    if (props.tab == "1") {
      getPeople().then((resp) => {
        setData(resp);
        setResults(resp);
      });
    } else if (props.tab == "2") {
      loadFriends();
    } else {
      loadRequests();
    }
    setLoading(false);
  }, [props.tab, reloadComponent]);

  const loadFriends = () => {
    let arr = [];
    getFriends().then((resp) => {
      if (Object.keys(resp).length > 0 && resp[0] != null) {
        resp.map((rel) => {
          if (rel.userId != getUserId()) {
            arr.push(rel);
          }
        });
      }
    });
    setData(arr);
    setResults(arr);
  };

  const loadRequests = () => {
    let arr = [];
    getRequests().then((resp) => {
      if (Object.keys(resp).length > 0) {
        resp.map((rel) => {
          if (rel.userId != getUserId()) {
            arr.push(rel);
          }
        });
      }
    });
    setData(arr);
    setResults(arr);
  };
  const search = (event) => {
    const searchWords = event.target.value;
    const res = data.filter((d) => {
      const name = d.alias.toLowerCase();
      return name.startsWith(searchWords.toLowerCase());
    });

    setResults(res ? res : data);
  };

  const handleSendFriendRequest = (id) => {
    sendFriendRequest(id);
    getPeople();
    getFriends();
    getPeople().then(() => setReloadComponent((prev) => !prev));
  };

  const unsendFriendRequest = (email) => {
    setRequested((prevReq) => prevReq.filter((friend) => friend !== email));
  };

  const blockUser = (email) => {
    setBlocked((prevBlocked) => [...prevBlocked, email]);
  };

  const removeUser = (id) => {
    removeFriendRequest(id);
    getPeople();
    getRequests();
    getFriends().then(() => setReloadComponent((prev) => !prev));
  };

  const unblockUser = (email) => {
    setBlocked((prevBlocked) =>
      prevBlocked.filter((friend) => friend !== email)
    );
  };

  const acceptRequest = (id) => {
    acceptFriendRequest(id);
    getPeople();
    getFriends();
    getRequests().then(() => setReloadComponent((prev) => !prev));
  };

  const declineRequest = (id) => {
    declineFriendRequest(id);
    getPeople();
    getFriends();
    getRequests().then(() => setReloadComponent((prev) => !prev));
  };

  const isUserRequested = (email) => {
    return requested.includes(email);
  };

  const isUserBlocked = (email) => {
    return blocked.includes(email);
  };

  const isFriend = (email) => {
    return friends.includes(email);
  };

  return !isAdmin() ? (
    <div
      id="scrollableDiv"
      className="md:w-8/12 xl:w-3/4"
      style={{
        height: "600px",
        overflow: "auto",
        padding: "0 16px",
      }}
    >
      {(props.tab == 1 || props.tab == 2) && (
        <div style={{ position: "sticky", top: "0", zIndex: "10" }}>
          <Input
            className="w-1/3"
            placeholder={t("friends_type")}
            onInput={search}
          />
        </div>
      )}

      <InfiniteScroll
        dataLength={results.length}
        next={loadMoreData}
        hasMore={results.length < 1}
        loader={
          results.length > 0 && (
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          )
        }
        endMessage={<Divider plain>{t("error_all_friends")}</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={results}
          renderItem={(item) =>
            item.role === "ROLE_USER" && (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={URL.createObjectURL(
                        base64ToFile(item.profilePicture)
                      )}
                    />
                  }
                  title={<a href="https://ant.design">{item.alias}</a>}
                  description={item.name}
                />
                {props.tab == 2 && (
                  <div>
                    {isUserBlocked(item.email) ? (
                      <Button
                        className="btn btn-primary bg-gray-400 hover:border-gray-300 text-white font-semibold"
                        onClick={() => unblockUser(item.email)}
                      >
                        {t("friends_unblock")}
                      </Button>
                    ) : (
                      <>
                        <Button
                          className="btn btn-secondary border-custRed text-custRed font-semibold hover:bg-custRed hover:text-white mr-3"
                          onClick={() => blockUser(item.email)}
                        >
                          {t("friends_block")}
                        </Button>
                        <Button
                          className="btn btn-primary bg-custNavy text-white font-semibold"
                          onClick={() => removeUser(item.userId)}
                        >
                          {t("friends_remove")}
                        </Button>
                      </>
                    )}
                  </div>
                )}
                {props.tab == 1 && (
                  <div>
                    {isUserRequested(item.email) ? (
                      <Button
                        className="btn btn-primary bg-custRed/60 hover:border-custRed text-white font-semibold"
                        onClick={() => unsendFriendRequest(item.email)}
                      >
                        {t("friends_unsend_req")}
                      </Button>
                    ) : (
                      <Button
                        className="btn btn-primary bg-custOrange/80 text-black font-semibold"
                        onClick={() => handleSendFriendRequest(item.userId)}
                      >
                        {t("friends_send_req")}
                      </Button>
                    )}
                  </div>
                )}
                {props.tab == 3 && (
                  <div>
                    {!isFriend(item.email) && (
                      <>
                        <Button
                          className="btn btn-primary border-green-500 bg-green-500 text-white font-semibold hover:bg-green-500 hover:text-white mr-3"
                          onClick={() => acceptRequest(item.userId)}
                        >
                          {t("friends_accept")}
                        </Button>
                        <Button
                          className="btn btn-secondary bg-custRed hover:border-custRed text-white font-semibold"
                          onClick={() => declineRequest(item.userId)}
                        >
                          {t("friends_decline")}
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </List.Item>
            )
          }
        />
      </InfiniteScroll>
    </div>
  ) : null;
};

export default ListComponent;
