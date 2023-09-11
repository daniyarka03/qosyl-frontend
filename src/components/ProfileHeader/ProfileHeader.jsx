import React from "react";
import styles from "./ProfileHeader.module.sass";
import CardSkeleton from "../CardSkeleton/CardSkeleton";

const ProfileHeader = ({currentUser, isUserLoading}) => {
  return (
    <div className={styles.profile}>
      {isUserLoading ? (
        <CardSkeleton cards={1} />
      ) : (
        <>
          <img
            className={styles.profile__avatar}
            src={`${import.meta.env.VITE_SERVER_URL_MEDIA}${
              currentUser.avatar
            }`}
          />
          <div className={styles.profile__name}>{currentUser.name}</div>
        </>
      )}
    </div>
  );
};

export default ProfileHeader;
