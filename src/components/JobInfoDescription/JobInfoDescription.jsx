import React from "react";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import styles from "./JobInfoDescription.module.sass";

const JobInfoDescription = ({icon, title, isJobLoading, description}) => {
  return (
    <section className={styles.description}>
      <div className={styles.description__wrapper}>
        <div className={styles.description__header}>
          <img
            className={styles.description__img}
            src={icon}
            alt={icon}
          />
          <h3 className={styles.description__title}>{title}</h3>
        </div>
        {isJobLoading ? (
          <CardSkeleton cards={1} />
        ) : (
          <p className={styles.description__text}>{description}</p>
        )}
      </div>
    </section>
  );
};

export default JobInfoDescription;
