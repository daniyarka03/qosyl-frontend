import React, { useEffect, useState } from "react";
import styles from "./JobCard.module.sass";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { projectsAPI } from "../../constants/API";
import CardSkeleton from "../CardSkeleton/CardSkeleton";

const JobCard = ({ job, onClick }) => {
  const [projectData, setProjectData] = useState("");
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  useEffect(() => {
    axios
      .get(projectsAPI + job.project_id)
      .then((data) => {
        setProjectData(data.data);
        setIsProjectLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [job]);

  return (
    <>
      {isProjectLoading ? (
        <CardSkeleton cards={4} />
      ) : (
        <>
          <div className={styles.user} onClick={onClick}>
            <div className={styles.wrapper}>
              <img
                className={styles.user__avatar}
                src={`${import.meta.env.VITE_SERVER_URL_MEDIA}${
                  projectData.image_src
                }`}
              />
              <div className={styles.user__text}>
                <p className={styles.user__name}>{job.title}</p>
                {/* <p className={styles.user__job}>{role}</p> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobCard;
