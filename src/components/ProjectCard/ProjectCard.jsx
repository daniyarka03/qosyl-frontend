import React from "react";
import styles from "./ProjectCard.module.sass"
import projectMembers from "../../assets/project-card-members.png";
import cleekLogo from "../../assets/cleek-logo.png";

const ProjectCard = ({project}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__wrapper}>
        <div className={styles.card__header}>
          <img className={styles.card__logo} src={cleekLogo} alt="" />
          <p className={styles.card__title}>{project.Name}</p>
        </div>
        <p className={styles.card__subheader}>{project.Type}</p>
        <div className={styles.card__additional}>
          <img
            className={styles.card__members__img}
            src={projectMembers}
            alt=""
          />
          <p className={styles.card__members}>
            {project.Members.length} members
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
