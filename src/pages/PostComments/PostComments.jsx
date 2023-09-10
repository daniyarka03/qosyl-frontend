import React, { useEffect, useState } from "react";
import styles from "./PostComments.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CommentCard from "../../components/CommentCard/CommentCard.jsx";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { postsAPI } from "../../constants/API";

const PostComments = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [isCommentLoading, setIsCommentLoading] = useState(true);
  const location = useLocation();
  const postID = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(postsAPI + postID);
        setComments(response.data.comments);
        setIsCommentLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, []);

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
          {isCommentLoading ? (
            <CardSkeleton cards={4} />
          ) : (
            <>
              {comments.map((comment) => (
                <CommentCard key={comment.comment_id} comment={comment} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComments;
