import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ProjectInfo.module.sass";
import { useLocation, useNavigate } from "react-router-dom";
import descriptionIcon from "../../assets/description-icon.svg";
import contactIcon from "../../assets/contact-icon.svg";
import axios from "axios";

const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/`;
const projectsAPI = `${import.meta.env.VITE_SERVER_URL}/api/projects/`;

const ProjectInfo = () => {
  const [project, setProject] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const projectID = location.pathname.split("/").pop();
  const [userID, setUserID] = useState({});

  const userInformation = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: { Authorization: `Bearer ${userInformation.token}` },
  };

  useEffect(() => {
    axios.get(userAPI, config).then((data) => {
      setUserID(data.data.user_id);
    });
  }, []);

  useEffect(() => {
    axios
      .get(projectsAPI + projectID)
      .then((data) => {
        setProject(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const src = `${
    import.meta.env.VITE_SERVER_URL
  }/api/projects/${projectID}/delete`;

  const deleteProject = () => {
    axios.delete(src).then(() => {});
    navigate("/profile");
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.header__wrapper}>
            <div className={styles.project__header}>
              {project.image_src && (
                <img
                  className={styles.project__logo}
                  src={`${import.meta.env.VITE_SERVER_URL}${project.image_src}`}
                  alt="Project Logo"
                />
              )}
              <div className={styles.project__info}>
                <p className={styles.project__title}>{project.title}</p>
                <p className={styles.project__type}>{project.type}</p>
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
                >
                  Подписаться
                </button>
              )}
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

export default ProjectInfo;
