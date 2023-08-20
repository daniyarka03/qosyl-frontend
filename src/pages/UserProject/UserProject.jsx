import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./UserProject.module.sass";
import cleekLogo from "../../assets/cleek-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import descriptionIcon from "../../assets/description-icon.svg";
import contactIcon from "../../assets/contact-icon.svg";
import axios from "axios";


const UserProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state.project;
  const src = `http://127.0.0.1:8000/api/projects/${project.project_id}/delete`;

  const deleteProject = () => {
    axios.delete(src).then(() => {})
    navigate("/profile")
  }

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.header__wrapper}>
            <div className={styles.project__header}>
              <img className={styles.project__logo} src={cleekLogo} alt="" />
              <div className={styles.project__info}>
                <p className={styles.project__title}>{project.title}</p>
                <p className={styles.project__type}>{project.type}</p>
              </div>
              <button
                className={`${styles.button} ${styles.button__edit}`}
                onClick={() =>
                  navigate(`/edit-project/${project.project_id}`, {
                    state: { project },
                  })
                }
              >
                Изменить
              </button>
              <button
                className={`${styles.button} ${styles.button__delete}`}
                onClick={deleteProject}
              >
                Удалить
              </button>
            </div>
          </div>
        </header>
        <section className={styles.description}>
          <div className={styles.description__wrapper}>
            <div className={styles.description__header}>
              <img
                className={styles.description__img}
                src={descriptionIcon}
                alt=""
              />
              <h3 className={styles.description__title}>Описание</h3>
            </div>

            <p className={styles.description__text}>{project.description}</p>
          </div>
        </section>
        <section className={styles.description}>
          <div className={styles.description__wrapper}>
            <div className={styles.description__header}>
              <img
                className={styles.description__img}
                src={contactIcon}
                alt=""
              />
              <h3 className={styles.description__title}>Контакты</h3>
            </div>

            <p className={styles.description__text}>{project.contact}</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserProject;