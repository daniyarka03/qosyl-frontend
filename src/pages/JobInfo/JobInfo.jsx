import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./JobInfo.module.sass";
import descriptionIcon from "../../assets/description-icon.svg";
import responsibilitiesIcon from "../../assets/responsibilities-icon.svg";
import requirementsIcon from "../../assets/requirements-icon.svg";
import giftIcon from "../../assets/gift-icon.svg";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { jobsAPI, projectsAPI } from "../../constants/API";

const JobInfo = () => {
  const navigate = useNavigate();
  const [isJobLoading, setIsJobLoading] = useState(true);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const location = useLocation();
  const jobID = location.pathname.split("/").pop();
  const [job, setJob] = useState({});
  const [project, setProject] = useState({});
  useEffect(() => {
    axios
      .get(jobsAPI + jobID)
      .then((data) => {
        setJob(data.data);
        setIsJobLoading(false);
        axios
          .get(projectsAPI + data.data.project_id)
          .then((data) => {
            setProject(data.data);
            setIsProjectLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const src = `${import.meta.env.VITE_SERVER_URL}/api/jobs/${jobID}/delete`;

  const deleteJob = () => {
    axios.delete(src).then(() => {});
    navigate("/profile");
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.header__wrapper}>
            <div className={styles.project__header}>
              {isProjectLoading ? (
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
                    src={`${import.meta.env.VITE_SERVER_URL_MEDIA}${
                      project.image_src
                    }`}
                  />
                  <div className={styles.project__info}>
                    <p className={styles.project__title}>{job.title}</p>
                    <p className={styles.project__type}>{job.work_format}</p>
                  </div>

                  {job.project_id === project.project_id ? (
                    <>
                      <button
                        className={`${styles.button} ${styles.button__edit}`}
                        onClick={() => navigate(`/edit-job/${jobID}`)}
                      >
                        Изменить
                      </button>
                      <button
                        className={`${styles.button} ${styles.button__delete}`}
                        onClick={deleteJob}
                      >
                        Удалить
                      </button>
                    </>
                  ) : (
                    <button
                      className={`${styles.button} ${styles.button__subscribe}`}
                      // onClick={() => onSubscribe(project.project_id)}
                    >
                      {/* {(!isSubscribed && "Подписаться") || "Отписаться"} */}
                    </button>
                  )}
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
            {isJobLoading ? (
              <CardSkeleton cards={1} />
            ) : (
              <p className={styles.description__text}>{job.description}</p>
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
            {isJobLoading ? (
              <CardSkeleton cards={1} />
            ) : (
              <p className={styles.description__text}>{job.responsibility}</p>
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
            {isJobLoading ? (
              <CardSkeleton cards={1} />
            ) : (
              <p className={styles.description__text}>{job.requirements}</p>
            )}
          </div>
        </section>
        <section className={styles.description}>
          <div className={styles.description__wrapper}>
            <div className={styles.description__header}>
              <img className={styles.description__img} src={giftIcon} alt="" />
              <h3 className={styles.description__title}>Условия</h3>
            </div>
            {isJobLoading ? (
              <CardSkeleton cards={1} />
            ) : (
              <p className={styles.description__text}>{job.we_offer}</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default JobInfo;
