import React from "react";
import styles from "./ProjectInfoHeader.module.sass";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
const ProjectInfoHeader = ({
  isLoading,
  project,
  userID,
  projectID,
  deleteProject,
  isSubscribed,
  onSubscribe,
  justUpdatedSubscribe,
  imageProject,
  navigate
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.project__header}>
          {isLoading ? (
            <CardSkeleton cards={1} width={200} />
          ) : (
            <>
              <img
                className={styles.project__logo}
                src={
                  justUpdatedSubscribe
                    ? import.meta.env.VITE_SERVER_URL + "/media/" + imageProject
                    : import.meta.env.VITE_SERVER_URL_MEDIA + imageProject
                }
                alt="Project Logo"
              />
              <div className={styles.project__info}>
                <p className={styles.project__title}>{project.title}</p>
                <p className={styles.project__type}>{project.type}</p>
                <p className={styles.project__type}>
                  Подписчики: {project.subscribers.length}
                </p>
              </div>

              {userID === project.author_id ? (
                <>
                  <button
                    className={`${styles.button} ${styles.button__edit}`}
                    onClick={() => navigate(`/edit-project/${projectID}`)}
                  >
                    Изменить
                  </button>
                  <button
                    className={`${styles.button} ${styles.button__delete}`}
                    onClick={deleteProject}
                  >
                    Удалить
                  </button>
                </>
              ) : (
                <button
                  className={`${styles.button} ${styles.button__subscribe}`}
                  onClick={() => onSubscribe(project.project_id)}
                >
                  {(!isSubscribed && "Подписаться") || "Отписаться"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProjectInfoHeader;
