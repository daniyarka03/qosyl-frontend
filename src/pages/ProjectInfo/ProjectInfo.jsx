import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ProjectInfo.module.sass";
import cleekLogo from "../../assets/cleek-logo.png";
import projectMembers from "../../assets/project-card-members.png";
import { useLocation } from "react-router-dom";

const ProjectInfo = () => {
  const location = useLocation();
  const project = location.state.project;

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.header__wrapper}>
            <div className={styles.project__header}>
              <div className={styles.project__info}>
                <img className={styles.project__logo} src={cleekLogo} alt="" />
                <p className={styles.project__title}>{project.Name}</p>
              </div>
              <button className={`${styles.button} ${styles.button__mark}`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 21V5C5 4.45 5.196 3.979 5.588 3.587C5.98 3.195 6.45067 2.99934 7 3H17C17.55 3 18.021 3.196 18.413 3.588C18.805 3.98 19.0007 4.45067 19 5V21L12 18L5 21Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <p className={styles.project__type}>{project.Type}</p>
            <div className={styles.project__members}>
              <img
                className={styles.project__members__img}
                src={projectMembers}
              />
              <p className={styles.project__members__text}>
                {project.Members.length} участника
              </p>
            </div>

            <button className={`${styles.button} ${styles.button__join}`}>
              Подписаться
            </button>
          </div>
        </header>
        <section className={styles.description}>
          <div className={styles.description__wrapper}>
            <h3 className={styles.description__title}>Описание</h3>
            <p className={styles.description__text}>{project.Description}</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectInfo;
