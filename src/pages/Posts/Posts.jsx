import React, { useEffect, useState } from "react";
import styles from "./Posts.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/PostCard/PostCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";


const postsAPI = `${import.meta.env.VITE_SERVER_URL}/api/posts/`;
const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [avatars, setAvatars] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await axios.get(postsAPI);
        setPosts(postsResponse.data);

        const avatarsData = {};
        for (const post of postsResponse.data) {
          const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/${
            post.author_id
          }`;
          const userResponse = await axios.get(userAPI);
          avatarsData[post.author_id] = userResponse.data.avatar;
        }
        setAvatars(avatarsData);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
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
          {isLoading &&<CardSkeleton cards={8}/>}
          {posts.map((post) => (
            <PostCard
              key={post.post_id}
              id={post.post_id}
              authorName={post.author_name}
              content={post.content}
              avatar={avatars[post.author_id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
