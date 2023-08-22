import React from "react";
import styles from "./PostCard.module.sass";
import postCardAvatar from "../../assets/post-card-avatar.png";
import { useNavigate } from "react-router-dom";

const PostCard = ({ postID, content }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.post}>
      <div className={styles.wrapper}>
        <div className={styles.post__creator}>
          <img className={styles.post__creator__avatar} src={postCardAvatar} />
          <p className={styles.post__creator__name}>Bulat Tagiyev</p>
        </div>
        <p className={styles.post__description}>{content}</p>
        <button
          className={styles.post__edit}
          onClick={() => navigate(`/edit-post/${postID}`)}
        >
          Изменить
        </button>
        <div className={styles.post__actions}></div>
      </div>
    </div>
  );
};

export default PostCard;
