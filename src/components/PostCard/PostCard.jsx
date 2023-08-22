import React from "react";
import styles from "./PostCard.module.sass";
import postCardAvatar from "../../assets/post-card-avatar.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostCard = ({ isUserPost, authorName, postID, content }) => {
  const navigate = useNavigate();
  const deletePostURL = `http://127.0.0.1:8000/api/posts/${postID}/delete/`
  const deletePost = () => {
    axios
      .delete(deletePostURL)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.post}>
      <div className={styles.wrapper}>
        <div className={styles.post__creator}>
          <img className={styles.post__creator__avatar} src={postCardAvatar} />
          <p className={styles.post__creator__name}>{authorName}</p>
        </div>
        <p className={styles.post__description}>{content}</p>
        {isUserPost && (<>
          <button
          className={`${styles.post__button} ${styles.post__edit}`}
          onClick={() => navigate(`/edit-post/${postID}`)}
        >
          Изменить
        </button>
        <button className={`${styles.post__button} ${styles.post__delete}`} onClick={deletePost}>
          Удалить
        </button></>)}
        
        <div className={styles.post__actions}></div>
      </div>
    </div>
  );
};

export default PostCard;
