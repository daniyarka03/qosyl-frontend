import React from "react";
import styles from "./PageNotFound.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import pageNotFound from "../../assets/pagenotfound.png";
import {useNavigate} from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <p className={styles.header}>Ошибка 404</p>
        <div className={styles.main}>
          <div className={styles.info}>
            <p className={styles.info__header}>Страница не найдена :3</p>
            <p className={styles.info__description}>
              Просим прощения но вы попытались перейти на не существующую
              страницу
            </p>
            <button
              className={styles.info__btn}
              onClick={() => navigate("/")}
            >
              Вернуться на главное
            </button>
          </div>
          <img className={styles.img} src={pageNotFound} alt="page not found" />
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
