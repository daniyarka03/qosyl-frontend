import React from "react";
import styles from "./Search.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import searchProjectsIcon from "../../assets/search-projects-icon.svg";
import searchUsersIcon from "../../assets/search-users-icon.svg";
import searchJobsIcon from "../../assets/search-jobs-icon.svg";
import { Link } from "react-router-dom";

const Search = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <p className={styles.header}>Поиск</p>
        <div className={styles.card}>
          <Link to={"./projects"} className={styles.card__wrapper}>
            <img className={styles.card__logo} src={searchProjectsIcon} />
            <p className={styles.card__title}>Проекты</p>
          </Link>
        </div>
        <div className={styles.card}>
          <Link to={"./users"} className={styles.card__wrapper}>
            <img className={styles.card__logo} src={searchUsersIcon} />
            <p className={styles.card__title}>Пользователи</p>
          </Link>
        </div>
        <div className={styles.card}>
         
          <Link to={"./jobs"} className={styles.card__wrapper}>
            <img className={styles.card__logo} src={searchJobsIcon} />
            <p className={styles.card__title}>Вакансии</p>
          </Link>
        </div>
        <div className={styles.card}>
          <Link to={"./students-clubs"} className={styles.card__wrapper}>
            <img className={styles.card__logo} src={searchUsersIcon} />
            <p className={styles.card__title}>Студенческие клубы</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Search;
