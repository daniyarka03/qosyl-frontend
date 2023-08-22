import React, { useEffect, useState } from "react";
import styles from "./Posts.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/PostCard/PostCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const src = "http://127.0.0.1:8000/api/posts/";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(src);
        setPosts(response.data);
      } catch (error) {
        console.log("Fetching failed", error);
      }
    };
    getPosts();
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
          {posts.map((post) => (
            <PostCard
              key={post.post_id}
              authorName={post.author_name}
              content={post.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
