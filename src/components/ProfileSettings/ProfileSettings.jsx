import React from "react";
import styles from "./ProfileSettings.module.sass";
import editProfileIcon from "../../assets/profile-edit-icon.svg";
import logoutProfileIcon from "../../assets/profile-logout-icon.svg";
const ProfileSettings = ({ navigate, logoutHandler }) => {
  return (
    <div className={styles.settings}>
      <button
        className={styles.settings__action}
        onClick={() => navigate("/create-project")}
      >
        Добавить проект
      </button>
      <button
        className={styles.settings__action}
        onClick={() => navigate("/create-job")}
      >
        Добавить вакансию
      </button>
      <button
        className={styles.settings__action}
        onClick={() => navigate("/create-students-club")}
      >
        Добавить студенческий клуб
      </button>
      <button
        className={styles.settings__action}
        onClick={() => navigate("/subscriptions-projects")}
      >
        Подписки на проекты
      </button>
    </div>
  );
};

export default ProfileSettings;
