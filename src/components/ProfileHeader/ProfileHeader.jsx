import React from "react";
import styles from "./ProfileHeader.module.sass";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import editProfileIcon from "../../assets/profile-edit-icon.svg";
import logoutProfileIcon from "../../assets/profile-logout-icon.svg";
import uuid from "react-uuid";
const ProfileHeader = ({
  currentUser,
  isUserLoading,
  hobbies,
  navigate,
  logoutHandler,
}) => {
  return (
    <div className={styles.profile__wrapper}>
      {isUserLoading ? (
        <CardSkeleton cards={1} />
      ) : (
        <div className={styles.profile}>

          <img
            className={styles.profile__avatar}
            src={`${import.meta.env.VITE_SERVER_URL_MEDIA}${
              currentUser.avatar
            }`}
          />

          <div className={styles.profile__info}>
            <p className={styles.profile__text}>
              Имя пользователя: {currentUser.name}
            </p>
            <p className={styles.profile__text}>
              Специальность: {currentUser.speciality}
            </p>
            <p className={styles.profile__text}>
              Место учебы: {currentUser.study_place}
            </p>
          </div>
          <div className={styles.profile__actions}>
            <img
              src={editProfileIcon}
              className={styles.profile__actions__img}
              onClick={() => navigate("/edit-profile")}
            />
            <img
              src={logoutProfileIcon}
              className={styles.profile__actions__img}
              onClick={() => logoutHandler()}
            />
          </div>
          <div className={styles.profile__hobbies}>
            <p className={styles.profile__text}>Хобби</p>
            <div className={styles.profile__hobbies__list}>
              {hobbies.map((hobby) => (
                <p key={uuid()} className={styles.profile__hobbies__item}>{hobby.value}</p>
              ))}
            </div>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default ProfileHeader;
