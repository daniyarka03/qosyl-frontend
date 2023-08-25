import React, { useEffect, useState } from "react";
import styles from "./PostComments.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/PostCard/PostCard";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";

const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/`;
const postsAPI = `${import.meta.env.VITE_SERVER_URL}/api/posts/`;

const PostComments = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [avatars, setAvatars] = useState({});
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation();
  const postID = location.pathname.split("/")[2]

  const userInformation = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: { Authorization: `Bearer ${userInformation.token}` },
  };
  useEffect(() => {
    axios.get(userAPI, config).then((data) => {
      setUser(data.data);
      setIsLoading(false)
      
    });
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
        try {
          const response = await axios.get(postsAPI + postID)
          setPost(response.data)
          setComments(response.data.comments)
        } catch (error) {
          console.log(error);
        }
      };
      fetchComments();
  }, [])

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <p className={styles.header}>Комментарии</p>
        <button
          className={styles.post__add}
          onClick={() => navigate(`/post/${postID}/create-comment`)}
        >
          Написать
        </button>
        <div className={styles.post__wrapper}>
          {isLoading &&<CardSkeleton cards={8}/>}
          {comments.map((comment) => (
            <PostCard
              key={post.comments.comment_id}
              id={post.comments.comment_id}
              authorName={user.name}
              content={comment.message}
              avatar={user.avatar}
              isComment = {true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostComments;
