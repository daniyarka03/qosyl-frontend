import React, {useState} from "react";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import styles from "./JobInfoHeader.module.sass";
import useGetCurrentUser from "../../hooks/useGetCurrentUser.js";
import axios from "axios";
import Swal from "sweetalert2";

const JobInfoHeader = ({
  isProjectLoading,
  project,
  job,
  jobID,
  deleteJob,
  navigate,
}) => {

  const [isUserLoading, setIsUserLoading] = useState(true);
  const { currentUser } = useGetCurrentUser(setIsUserLoading);

  const onModalContant = (project) => {
    Swal.fire({
      title: 'Ниже контакты! Скопируй и напиши ему',
      text: project.contact,
      icon: 'success',
      confirmButtonText: 'Хорошо'
    })
  }


  return (
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

              {project.author_id === currentUser.user_id ? (
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
                  onClick={() => onModalContant(project)}
                >
                  Откликнуться
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default JobInfoHeader;
