import { MehOutlined, PictureOutlined } from "@ant-design/icons";
import Comment from "@components/FeedComponents/Comment.js";
import Post from "@components/FeedComponents/Post.js";
import NewPost from "@components/PostsComponents/NewPost.js";
import PostsContext from "@services/PostsContext";
import { base64ToFile } from "@services/helpers";
import "@styles/welcome.css";
import { Button, Result } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FeedPosts = (props) => {
  const { t } = useTranslation();
  const { posts, getTimelinePosts, getUserPosts } = useContext(PostsContext);
  const [showAddNewPost, setShowAddNewPost] = useState(false);

  const togglePost = () => {
    setShowAddNewPost((p) => !p);
  };

  useEffect(() => {
    if (props.canEdit) {
      getUserPosts();
    } else {
      getTimelinePosts();
    }
  }, []);

  const returnPosts = () => {
    return posts && posts.length > 0 ? (
      posts.map((post) => (
        <div key={post.postId} className="mb-6 flex flex-col md:flex-row">
          <div className="w-2/5">
            <Post
              postId={post.postId}
              avatar={URL.createObjectURL(
                base64ToFile(post.creator.profilePicture)
              )}
              alias={post.creator.alias}
              description={post.text}
              img={URL.createObjectURL(base64ToFile(post.content))}
              canEdit={props.canEdit}
            />
          </div>
          <div className="w-3/5">
            <Comment
              comments={post.comments}
              canEdit={props.canEdit}
              postId={post.postId}
            />
          </div>
        </div>
      ))
    ) : (
      <div>
        <Result
          icon={props.canEdit == "true" ? <PictureOutlined /> : <MehOutlined />}
          title={
            props.canEdit == "true" ? (
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-custOrange">
                {t("error_my_posts_empty")}
              </span>
            ) : (
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-custGreen to-custOrange">
                {t("error_feed_empty")}
              </span>
            )
          }
          extra={
            props.canEdit != "true" && (
              <Link to={"/friends"}>
                <Button className="bg-custGreen text-white font-semibold">
                  {t("nav_friends")}
                </Button>
              </Link>
            )
          }
        />
      </div>
    );
  };

  return (
    <>
      {props.canEdit == "true" && (
        <div className="">
          <Button
            className="fixed bg-custGreen text-white hover:border-custGreen"
            onClick={togglePost}
          >
            {t("posts_create")}
          </Button>
          <NewPost show={showAddNewPost} toggleShow={togglePost} />
        </div>
      )}
      <div className="xs:w-full md:w-3/4 lg:max-h-[47rem] md:max-h-[35rem] overflow-y-auto no-scrollbar mt-10">
        {returnPosts()}
      </div>
    </>
  );
};

export default FeedPosts;
