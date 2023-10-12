import React from "react";
import { Collapse } from "antd";

const text = `
  You press the button "Posts" in the navbar on the left side and there you will find a red button called "Create Post".
  Click it and write a description for your post. Optionally, you can upload an image/video as well.
`;
const text1 = `
  Go to "Feed" on the navbar on the left side and if you have friends, their posts will be on the page for you to see.
  On the left side of a post there is a section where you can see the comments of each post. You can create you comment there.
`;

const text2 = `
  Press the button "Friends" on the navbar on the left side. There you will see three sections. In the first you can see users
  who you have no relation with. The second one shows you your friends. And the third one is for those who have sent you a friend 
  request. If you add friends, you can take a look at the bottom right of the screen where you will find a chat where you can
  exchange messages with your friends.
`;

const items = [
  {
    key: "1",
    label: "How do I create a post?",
    children: <p>{text}</p>,
  },
  {
    key: "2",
    label: "How do I comment on a post?",
    children: <p>{text1}</p>,
  },
  {
    key: "3",
    label: "How do I interact with other users?",
    children: <p>{text2}</p>,
  },
];

const FAQComp = () => (
  <Collapse className="w-3/5" defaultActiveKey={["1"]}>
    {items.map((item) => (
      <Collapse.Panel key={item.key} header={item.label}>
        {item.children}
      </Collapse.Panel>
    ))}
  </Collapse>
);

export default FAQComp;
