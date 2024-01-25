import React from "react";
import styles from "./ProjectInfoDescription.module.sass";
import CardSkeleton from "../CardSkeleton/CardSkeleton";

const ProjectInfoDescription = ({ isLoading, title, icon, description }) => {
  return (
    <section className={styles.description}>
      <div className={styles.description__wrapper}>
        <div className={styles.description__header}>
          <img className={styles.description__img} src={icon} alt={icon} />
          <h3 className={styles.description__title}>{title}</h3>
        </div>
        {isLoading ? (
          <CardSkeleton cards={1} />
        ) : (
          <p className={styles.description__text}>{description}</p>
        )}
      </div>
    </section>
  );
};

export default ProjectInfoDescription;
