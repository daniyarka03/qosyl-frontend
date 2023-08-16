import React from "react";
import styles from "./Search.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import cleekLogo from "../../assets/cleek-logo.png";
import { Link } from "react-router-dom";

const Search = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <p className={styles.header}>ПОИСК</p>
        <div className={styles.card}>
          <Link to={"./projects"} className={styles.card__wrapper}>
            <img className={styles.card__logo} src={cleekLogo} />
            <p className={styles.card__title}>Поиск проектов</p>
          </Link>
        </div>
        <div className={styles.card}>
          <Link to={"./users"} className={styles.card__wrapper}>
            <img className={styles.card__logo} src={cleekLogo} />
            <p className={styles.card__title}>Поиск пользователей</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Search;
