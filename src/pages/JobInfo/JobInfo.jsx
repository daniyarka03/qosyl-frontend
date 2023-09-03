import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./JobInfo.module.sass";
import cleekLogo from "../../assets/cleek-logo.png";
import descriptionIcon from "../../assets/description-icon.svg";
import contactIcon from "../../assets/contact-icon.svg";
import responsibilitiesIcon from "../../assets/responsibilities-icon.svg";
import requirementsIcon from "../../assets/requirements-icon.svg";
import giftIcon from "../../assets/gift-icon.svg";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";

const JobInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
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
                    // src={
                    //   justUpdatedSubscribe
                    //     ? import.meta.env.VITE_SERVER_URL +
                    //       "/media/" +
                    //       imageProject
                    //     : import.meta.env.VITE_SERVER_URL_MEDIA + imageProject
                    // }
                    src={cleekLogo}
                    alt="Project Logo"
                  />
                  <div className={styles.project__info}>
                    <p className={styles.project__title}>Имя вакансии</p>
                    <p className={styles.project__type}>Тип вакансии</p>
                  </div>

                  {/* {userID === project.author_id ? (
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
                      {(!isSubscribed && "Подписаться") || "Отписаться"}
                    </button>
                  )} */}
                </>
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
            {isLoading ? (
              <CardSkeleton cards={1} />
            ) : (
              <p className={styles.description__text}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error quisquam repellat enim, consectetur tenetur vel placeat. Delectus aliquam animi fugiat corporis, deserunt reprehenderit eius vel accusantium dolor atque eos temporibus?</p>
            )}
          </div>
        </section>
        <section className={styles.description}>
          <div className={styles.description__wrapper}>
            <div className={styles.description__header}>
              <img
                className={styles.description__img}
                src={responsibilitiesIcon}
                alt=""
              />
              <h3 className={styles.description__title}>Обязанности</h3>
            </div>
            {isLoading ? (
              <CardSkeleton cards={1} />
            ) : (
              <p className={styles.description__text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nulla ex ullam saepe, expedita incidunt qui deleniti esse adipisci? Iure sequi reprehenderit voluptas qui temporibus debitis consectetur mollitia omnis velit.</p>
            )}
          </div>
        </section>
        <section className={styles.description}>
          <div className={styles.description__wrapper}>
            <div className={styles.description__header}>
              <img
                className={styles.description__img}
                src={requirementsIcon}
                alt=""
              />
              <h3 className={styles.description__title}>Требования</h3>
            </div>
            {isLoading ? (
              <CardSkeleton cards={1} />
            ) : (
              <p className={styles.description__text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nulla ex ullam saepe, expedita incidunt qui deleniti esse adipisci? Iure sequi reprehenderit voluptas qui temporibus debitis consectetur mollitia omnis velit.</p>
            )}
          </div>
        </section>
        <section className={styles.description}>
          <div className={styles.description__wrapper}>
            <div className={styles.description__header}>
              <img
                className={styles.description__img}
                src={giftIcon}
                alt=""
              />
              <h3 className={styles.description__title}>Условия</h3>
            </div>
            {isLoading ? (
              <CardSkeleton cards={1} />
            ) : (
              <p className={styles.description__text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nulla ex ullam saepe, expedita incidunt qui deleniti esse adipisci? Iure sequi reprehenderit voluptas qui temporibus debitis consectetur mollitia omnis velit.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default JobInfo;
