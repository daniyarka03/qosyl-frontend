import React from "react";
import styles from "./UserCard.module.sass";
import userAvatar from "../../assets/cleek-logo.png";
const UserCard = () => {
  return (
    <div className={styles.user}>
      <div className={styles.wrapper}>
        <img className={styles.user__avatar} src={userAvatar} />
        <div className={styles.user__text}>
          <p className={styles.user__name}>Алмурт Кеннеди</p>
          <p className={styles.user__job}>Frontend-разработчик</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
