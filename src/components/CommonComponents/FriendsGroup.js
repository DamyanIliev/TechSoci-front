import { base64ToFile } from "@services/helpers";
import { Avatar } from "antd";
const FriendsGroup = (props) => {
  let friends = props.friends;
  const sendDataToParent = (alias) => {
    props.sendDataToParent(alias);
  };

  const renderAvatars = () => {
    return (
      friends &&
      friends.map((friend) => (
        <Avatar
          key={friend.userId}
          src={
            friend.profilePicture
              ? URL.createObjectURL(base64ToFile(friend.profilePicture))
              : null
          }
          alt={friend.alias}
          className="cursor-pointer"
          onClick={() => sendDataToParent(friend.alias)}
        />
      ))
    );
  };

  return (
    <>
      <Avatar.Group
        maxCount={10}
        maxPopoverPlacement="bottom"
        size="large"
        maxStyle={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
          cursor: "pointer",
        }}
      >
        {renderAvatars()}
      </Avatar.Group>
    </>
  );
};

export default FriendsGroup;
