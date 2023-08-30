import React, { useEffect, useState } from "react";
import styles from "./Posts.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/PostCard/PostCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import useGetPosts from "../../hooks/useGetPosts";
import { userAPI } from "../../constants/API";

const Posts = () => {
  const navigate = useNavigate();
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const { posts } = useGetPosts(setIsPostLoading);
  const [avatars, setAvatars] = useState({});

  useEffect(() => {
    const avatarsData = {};
    for (const post of posts) {
      axios
        .get(userAPI + post.author_id)
        .then((userResponse) => {
          avatarsData[post.author_id] = userResponse.data.avatar;
          setAvatars(avatarsData);
          setIsAvatarLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <p className={styles.header}>Посты</p>
        <button
          className={styles.post__add}
          onClick={() => navigate("/create-post")}
        >
          Новый пост
        </button>
        <div className={styles.post__wrapper}>
          {isPostLoading && isAvatarLoading ? (
            <CardSkeleton cards={8} />
          ) : (
            <>
              {posts.map((post) => (
                <PostCard
                  key={post.post_id}
                  post={post}
                  avatar={avatars[post.author_id]}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
