import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ProjectInfo.module.sass";
import { useLocation, useNavigate } from "react-router-dom";
import descriptionIcon from "../../assets/description-icon.svg";
import contactIcon from "../../assets/contact-icon.svg";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import axios from "axios";
import {useCurrentUserData} from "../../actions/getCurrentUserData.js";


const projectsAPI = `${import.meta.env.VITE_SERVER_URL}/api/projects/`;


const ProjectInfo = () => {
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [imageProject, setImageProject] = useState("");
  const [justUpdatedSubscribe, setJustUpdatedSubscribe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const projectID = location.pathname.split("/").pop();
  const { userID } = useCurrentUserData();


  // useEffect(() => {
  //   axios.get(userAPI, config).then((data) => {
  //     setUserID(data.data.user_id);
  //   });
  // }, []);

  useEffect(() => {
    axios
      .get(projectsAPI + projectID)
      .then((data) => {
        setProject(data.data);
        setImageProject(data.data.image_src);
        setIsSubscribed(data.data.subscribers.includes(userID));
        setIsLoading(false);
      })
      .catch((error) => {
       // console.log(projectsAPI + projectID)
        console.log(error);
      });
  }, [userID]);

  const src = `${
    import.meta.env.VITE_SERVER_URL
  }/api/projects/${projectID}/delete`;

  const deleteProject = () => {
    axios.delete(src).then(() => {});
    navigate("/profile");
  };

  const onSubscribe = (projectID) => {
    setJustUpdatedSubscribe(true)

    const mediaRoot = '/cXQYMmoJTmnj79aRVNDw16rkoGW/media';
    const isSubscribedForProject = project.subscribers.includes(userID);
    const imageProject = project.image_src.replace(mediaRoot, '');
    let updatedSubscribers;

    if (isSubscribedForProject) {
      updatedSubscribers = project.subscribers.filter(id => id !== userID); // Удаляем пользователя
    } else {
      updatedSubscribers = [...project.subscribers, userID]; // Добавляем пользователя
    }

    const updatedProject = { ...project, subscribers: updatedSubscribers, image_src: imageProject };

    const src = `${
        import.meta.env.VITE_SERVER_URL
    }/api/projects/${projectID}/update/`;
    axios.put(src, updatedProject)
        .then((response) => {
          console.log('Проект успешно обновлен', response.data);
          setProject(updatedProject);
          setImageProject(imageProject);
          setIsSubscribed(!isSubscribedForProject); // Инвертируем состояние подписки
          // Обновите состояние проекта в вашем компоненте
          // чтобы отразить изменения на интерфейсе
        })
        .catch((error) => {
          console.error('Ошибка при обновлении проекта', error);
        });
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
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
                      justUpdatedSubscribe ? (import.meta.env.VITE_SERVER_URL + "/media/"+
                        imageProject) :
                          (import.meta.env.VITE_SERVER_URL_MEDIA +
                      imageProject)
                    }
                    alt="Project Logo"
                  />
                  <div className={styles.project__info}>
                    <p className={styles.project__title}>{project.title}</p>
                    <p className={styles.project__type}>{project.type}</p>
                    <p className={styles.project__type}>Подписчики: {project.subscribers.length}</p>
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
                  {!isSubscribed && "Подписаться" || "Отписаться"}
                </button>
              )}
                </>)}
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
            {isLoading ? (
              <CardSkeleton cards={1} />
            ) : (
              <p className={styles.description__text}>{project.description}</p>
            )}
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
            {isLoading ? (
              <CardSkeleton cards={1} />
            ) : (
              <p className={styles.description__text}>{project.contact}</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectInfo;
