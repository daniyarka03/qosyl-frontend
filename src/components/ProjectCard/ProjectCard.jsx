import React from "react";
import styles from "./ProjectCard.module.sass";
import projectMembers from "../../assets/project-card-members.png";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.card__wrapper}>
        <div className={styles.card__header}>
          <img
            className={styles.card__logo}
            src={`${import.meta.env.VITE_SERVER_URL_MEDIA}${project.image_src}`}
            alt=""
          />
          <p className={styles.card__title}>{project.title}</p>
        </div>
        <p className={styles.card__subheader}>{project.type}</p>
        <div className={styles.card__additional}>
          <img
            className={styles.card__members__img}
            src={projectMembers}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
