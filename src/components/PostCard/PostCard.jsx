import React from "react";
import styles from "./PostCard.module.sass";
import postCardAvatar from "../../assets/post-card-avatar.png";

const PostCard = ({content}) => {
  return (
    <div className={styles.post}>
      <div className={styles.wrapper}>
        <div className={styles.post__creator}>
          <img className={styles.post__creator__avatar} src={postCardAvatar} />
          <p className={styles.post__creator__name}>Bulat Tagiyev</p>
        </div>
        <p className={styles.post__description}>
          {content}
        </p>
        <div className={styles.post__actions}></div>
      </div>
    </div>
  );
};

export default PostCard;
