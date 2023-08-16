import React from "react";
import styles from "./Profile.module.sass";
import PostCard from "../../components/PostCard/PostCard";
import Navbar from "../../components/Navbar/Navbar";
const Profile = () => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.profile}>
        <div className={styles.profile__avatar}></div>
        <div className={styles.profile__name}>Данияр</div>
      </div>
      <div className={styles.settings}>
        <button className={styles.change}>Изменить</button>
      </div>
      <div className={styles.posts}>
        <p className={styles.posts__header}>Посты</p>
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};

export default Profile;
