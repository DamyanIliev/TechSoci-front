import {
  CommentOutlined,
  DeleteTwoTone,
  SendOutlined,
} from "@ant-design/icons";
import CommentsContext from "@services/CommentsContext";
import { getUserAlias } from "@services/auth";
import { base64ToFile } from "@services/helpers";
import "@styles/welcome.css";
import { Avatar, Card, Divider, Input, Popconfirm, Result } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const { TextArea } = Input;
const { Meta } = Card;

const Comment = (props) => {
  const { t } = useTranslation();
  const globalUser = getUserAlias();
  const { canEdit, postId } = props;
  const { createComment, deleteComment, getComments } =
    useContext(CommentsContext);

  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const changeText = (e) => setText(e.target.value);

  useEffect(() => {
    if (postId && postId !== undefined) {
      getCommentsFromStore();
    }
  }, []);

  const getCommentsFromStore = () => {
    getComments(postId).then((resp) => {
      if (resp) {
        setComments(resp);
      }
    });
  };
  const handleSubmitComment = (postId, text) => {
    if (postId && text) {
      createComment(postId, text).then((response) => {
        if (response.status === 200) {
          getCommentsFromStore();
          setText("");
        }
      });
    }
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then((response) => {
      if (response.status === 200) {
        getCommentsFromStore();
      }
    });
  };

  const renderComments = () => {
    return comments && comments.length > 0 ? (
      comments.map((comment, index) => (
        <div className="text-sm mt-3" key={comment.commentId}>
          <Meta
            className="m-2"
            avatar={
              <Avatar
                src={URL.createObjectURL(
                  base64ToFile(comment.user.profilePicture)
                )}
              />
            }
            title={<p className="text-sm">{comment.user.alias}</p>}
            description={<p>{comment.text}</p>}
          />
          {comment.user.alias === globalUser && canEdit === "true" && (
            <Divider orientation="right">
              <Popconfirm
                placement="right"
                title={t("posts_delete")}
                description={t("posts_delete_comment_pop")}
                onConfirm={() => handleDeleteComment(comment.commentId)}
                okText={t("common_yes")}
                cancelText={t("common_no")}
              >
                <DeleteTwoTone className="ml-3 pb-1/2" twoToneColor="#D80027" />
              </Popconfirm>
            </Divider>
          )}
        </div>
      ))
    ) : (
      <div>
        <Result icon={<CommentOutlined />} title={t("error_comments_empty")} />
      </div>
    );
  };

  return (
    <div className="ml-4">
      <Card
        className="md:w-4/5 max-h-2/3 overflow-y-auto"
        actions={[
          <div className="m-2 flex items-center">
            <TextArea
              value={text}
              onChange={changeText}
              placeholder={t("posts_comment")}
              allowClear
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
              maxLength={250}
            />
            <SendOutlined
              className="m-2"
              onClick={() => {
                handleSubmitComment(postId, text);
              }}
            />
          </div>,
        ]}
      >
        <div className="h-52 overflow-y-auto">{renderComments()}</div>
      </Card>
    </div>
  );
};

export default Comment;
