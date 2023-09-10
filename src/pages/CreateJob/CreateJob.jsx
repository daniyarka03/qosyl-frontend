import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./CreateJob.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import axios from "axios";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useGetProjects from "../../hooks/useGetProjects";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../constants/API";
import CreateJobForm from "../../components/CreateJobForm/CreateJobForm";

const CreateJob = () => {
  const navigate = useNavigate();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const { currentUser } = useGetCurrentUser(setIsUserLoading);
  const { projects } = useGetProjects(setIsProjectLoading);

  const [jobTitle, setJobTitle] = useState("");
  const [project, setProject] = useState("");
  const [projectID, setProjectID] = useState("");
  const [jobFormat, setJobFormat] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobResponsibilites, setJobResponsibilities] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [jobOffer, setJobOffer] = useState("");

  const [inputErrors, setInputErrors] = useState({
    jobTitle: "",
    project: "",
    jobFormat: "",
    jobDescription: "",
    jobResponsibilites: "",
    jobRequirements: "",
    jobOffer: "",
  });

  const validateForm = () => {
    const errors = {};
    if (!jobTitle) errors.jobTitle = "Введите название вакансии";
    if (!project) errors.project = "Выберите ваш проект";
    if (!jobFormat) errors.jobFormat = "Выберите формат работы";
    if (!jobDescription) errors.jobDescription = "Введите описание вакансии";
    if (!jobResponsibilites)
      errors.jobResponsibilites = "Введите обязанности для вакансии";
    if (!jobRequirements)
      errors.jobRequirements = "Введите требования вакансии";
    if (!jobOffer) errors.jobOffer = "Введите условия вакансии";
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("title", jobTitle);
      formData.append("project_id", projectID);
      formData.append("work_format", jobFormat);
      formData.append("description", jobDescription);
      formData.append("responsibility", jobResponsibilites);
      formData.append("requirements", jobRequirements);
      formData.append("we_offer", jobOffer);
      axios
        .post(createJob, formData)
        .then(function (response) {
          navigate(`/job/${response.data.job_id}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleChange = (event) => {
    const selectedProject = event.target.value;
    const selectedProjectID =
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-projectid"
      );
    setProject(selectedProject);
    setProjectID(selectedProjectID);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <img className={styles.header__logo} src={projectLogo} />
          <div className={styles.header__text}>
            <p className={styles.header__title}>Создание вакансии</p>
            <p className={styles.header__subtitle}>
              Нет ничего лучшего чем привлечение амбициозных специалистов
            </p>
          </div>
        </div>
        <CreateJobForm
          handleSubmit={handleSubmit}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          project={project}
          setProject={setProject}
          jobFormat={jobFormat}
          setJobFormat={setJobFormat}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          jobResponsibilites={jobResponsibilites}
          setJobResponsibilities={setJobResponsibilities}
          jobRequirements={jobRequirements}
          setJobRequirements={setJobRequirements}
          jobOffer={jobOffer}
          setJobOffer={setJobOffer}
          validateForm={validateForm}
          inputErrors={inputErrors}
          handleChange={handleChange}
          projects={projects}
          currentUser={currentUser}
        />
      </div>
    </>
  );
};

export default CreateJob;
