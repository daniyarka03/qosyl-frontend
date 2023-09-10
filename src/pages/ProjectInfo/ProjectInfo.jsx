import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ProjectInfo.module.sass";
import { useLocation, useNavigate } from "react-router-dom";
import descriptionIcon from "../../assets/description-icon.svg";
import contactIcon from "../../assets/contact-icon.svg";
import axios from "axios";
import { useCurrentUserData } from "../../actions/getCurrentUserData.js";
import { projectsAPI } from "../../constants/API";
import ProjectInfoHeader from "../../components/ProjectInfoHeader/ProjectInfoHeader";
import ProjectInfoDescription from "../../components/ProjectInfoDescription/ProjectInfoDescription";

const ProjectInfo = ({ setProjectDeleted }) => {
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [imageProject, setImageProject] = useState("");
  const [justUpdatedSubscribe, setJustUpdatedSubscribe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const projectID = location.pathname.split("/").pop();
  const { userID } = useCurrentUserData();

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
        console.log(error);
      });
  }, [userID]);

  const src = `${
    import.meta.env.VITE_SERVER_URL
  }/api/projects/${projectID}/delete`;

  const deleteProject = () => {
    axios.delete(src).then(() => {
      setProjectDeleted(true);
      navigate("/profile");
    });
  };

  const onSubscribe = (projectID) => {
    setJustUpdatedSubscribe(true);

    const mediaRoot = "/cXQYMmoJTmnj79aRVNDw16rkoGW/media";
    const isSubscribedForProject = project.subscribers.includes(userID);
    const imageProject = project.image_src.replace(mediaRoot, "");
    let updatedSubscribers;

    if (isSubscribedForProject) {
      updatedSubscribers = project.subscribers.filter((id) => id !== userID); // Удаляем пользователя
    } else {
      updatedSubscribers = [...project.subscribers, userID]; // Добавляем пользователя
    }

    const updatedProject = {
      ...project,
      subscribers: updatedSubscribers,
      image_src: imageProject,
    };

    const src = `${
      import.meta.env.VITE_SERVER_URL
    }/api/projects/${projectID}/update/`;
    axios
      .put(src, updatedProject)
      .then((response) => {
        console.log("Проект успешно обновлен", response.data);
        setProject(updatedProject);
        setImageProject(imageProject);
        setIsSubscribed(!isSubscribedForProject); // Инвертируем состояние подписки
        // Обновите состояние проекта в вашем компоненте
        // чтобы отразить изменения на интерфейсе
      })
      .catch((error) => {
        console.error("Ошибка при обновлении проекта", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <ProjectInfoHeader
          isLoading={isLoading}
          project={project}
          userID={userID}
          projectID={projectID}
          deleteProject={deleteProject}
          isSubscribed={isSubscribed}
          onSubscribe={onSubscribe}
          justUpdatedSubscribe={justUpdatedSubscribe}
          imageProject={imageProject}
          navigate={navigate}
        />
        <ProjectInfoDescription
          isLoading={isLoading}
          title={"Описание"}
          icon={descriptionIcon}
          description={project.description}
        />
        <ProjectInfoDescription
          isLoading={isLoading}
          title={"Контакты"}
          icon={contactIcon}
          description={project.contact}
        />
      </div>
    </>
  );
};

export default ProjectInfo;