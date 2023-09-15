import React from "react";
import styles from "./ProjectInfoHeader.module.sass";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import { AiOutlineEdit } from "react-icons/ai";
import {AiOutlineDelete} from "react-icons/ai"
import menuDropdownIcon from "../../assets/menu-dropdown-icon.svg";
import { Link } from "react-router-dom";
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
  navigate,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.project__header}>
          {isLoading ? (
            <CardSkeleton cards={1} width={200} />
          ) : (
            <>
              <div className={styles.project__intro}>
                <img
                  className={styles.project__logo}
                  src={
                    justUpdatedSubscribe
                      ? import.meta.env.VITE_SERVER_URL +
                        "/media/" +
                        imageProject
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
              </div>
              {userID === project.author_id ? (
                <div className={styles.project__settings}>
                  <Link className={styles.project__settings__item} to={`/edit-project/${projectID}`}>
                    <AiOutlineEdit size={"6rem"} color="41b1e4"/>
                  </Link>
                  <Link className={styles.project__settings__item} onClick={deleteProject}>
                    <AiOutlineDelete size={"6rem"}  color="d40b4e"/>
                  </Link>
                </div>
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
