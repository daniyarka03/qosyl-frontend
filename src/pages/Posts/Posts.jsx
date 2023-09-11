import React, { useEffect, useState } from "react";
import styles from "./Posts.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/PostCard/PostCard";
import { useNavigate } from "react-router-dom";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import useGetPosts from "../../hooks/useGetPosts";

const Posts = () => {
  const navigate = useNavigate();
  const [isPostLoading, setIsPostLoading] = useState(true);
  const { posts } = useGetPosts(setIsPostLoading);

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
          {isPostLoading ? (
            <CardSkeleton cards={3} />
          ) : (
            <>
              {posts.map((post) => (
                <PostCard key={post.post_id} post={post} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
