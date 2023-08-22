import React from "react";
import styles from "./UserCard.module.sass";
import userAvatar from "../../assets/cleek-logo.png";
import { useNavigate } from "react-router-dom";

const UserCard = ({userId, name, role, currentUser}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (currentUser.user_id === userId) navigate("/profile")
    else navigate(`/user/${userId}`)
  }
  return (
    <div className={styles.user} onClick={handleClick}>
      <div className={styles.wrapper}>
        <img className={styles.user__avatar} src={userAvatar} />
        <div className={styles.user__text}>
          <p className={styles.user__name}>{name}</p>
          <p className={styles.user__job}>{role}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
