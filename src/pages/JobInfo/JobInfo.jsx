import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./JobInfo.module.sass";
import descriptionIcon from "../../assets/description-icon.svg";
import responsibilitiesIcon from "../../assets/responsibilities-icon.svg";
import requirementsIcon from "../../assets/requirements-icon.svg";
import giftIcon from "../../assets/gift-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { jobsAPI, projectsAPI } from "../../constants/API";
import JobInfoHeader from "../../components/JobInfoHeader/JobInfoHeader";
import JobInfoDescription from "../../components/JobInfoDescription/JobInfoDescription";

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
        <JobInfoHeader
          isProjectLoading={isProjectLoading}
          project={project}
          job={job}
          jobID={jobID}
          deleteJob={deleteJob}
          navigate={navigate}
        />
        <JobInfoDescription
          icon={descriptionIcon}
          isJobLoading={isJobLoading}
          title={"Описание"}
          description={job.description}
        />
        <JobInfoDescription
          icon={responsibilitiesIcon}
          isJobLoading={isJobLoading}
          title={"Обязанности"}
          description={job.responsibility}
        />
        <JobInfoDescription
          icon={requirementsIcon}
          isJobLoading={isJobLoading}
          title={"Требования"}
          description={job.requirements}
        />
        <JobInfoDescription
          icon={giftIcon}
          isJobLoading={isJobLoading}
          title={"Условия"}
          description={job.we_offer}
        />
      </div>
    </>
  );
};

export default JobInfo;
