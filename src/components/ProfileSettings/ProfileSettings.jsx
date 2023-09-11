import React from 'react'
import styles from "./ProfileSettings.module.sass";
const ProfileSettings = ({navigate, logoutHandler}) => {
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
          onClick={() => navigate("/edit-profile")}
        >
          Изменить
        </button>

        <button
          className={styles.settings__action}
          onClick={() => navigate("/subscriptions-projects")}
        >
          Подписки на проекты
        </button>
        <button
          className={styles.settings__action}
          onClick={() => logoutHandler()}
        >
          Выйти
        </button>
      </div>
  )
}

export default ProfileSettings