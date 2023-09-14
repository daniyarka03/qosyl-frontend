import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./EditJob.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import axios from "axios";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useGetProjects from "../../hooks/useGetProjects";
import { useLocation, useNavigate } from "react-router-dom";
import { jobsAPI } from "../../constants/API";
import EditJobForm from "../../components/EditJobForm/EditJobForm";

const EditJob = () => {
  const navigate = useNavigate();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const { currentUser } = useGetCurrentUser(setIsUserLoading);
  const { projects } = useGetProjects(setIsProjectLoading);

  const [jobTitle, setJobTitle] = useState("");
  const [project, setProject] = useState("");
  const [selectedOption, setSelectedOption] = useState(null); // Добавьте state для выбранной опции

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

  const location = useLocation();
  const jobID = location.pathname.split("/").pop();
  const editJob = `https://qosyl.me:8000/cXQYMmoJTmnj79aRVNDw16rkoGW/api/jobs/${jobID}/update/`;

  useEffect(() => {
    axios
      .get(jobsAPI + jobID)
      .then((data) => {
        const testArray = [];
        testArray.push({
          value: data.data.title,
          label: data.data.title,
        });
        setJobTitle(testArray);

        setProjectID(data.data.project_id);

        const testArray2 = [];
        testArray2.push({
          value: data.data.work_format,
          label: data.data.work_format,
        });
        setJobFormat(testArray2);

        // setJobFormat(data.data.work_format);
        setJobDescription(data.data.description);
        setJobResponsibilities(data.data.responsibility);
        setJobRequirements(data.data.requirements);
        setJobOffer(data.data.we_offer);
        // Здесь устанавливаем значение project на основе полученного project_id
        const selectedProject = projects.find(
          (project) => project.project_id === data.data.project_id
        );
        if (selectedProject) {
          setProject(selectedProject.title);
          setSelectedOption({
            value: selectedProject.project_id,
            label: selectedProject.title,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [jobID, projects]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("title", jobTitle.value || jobTitle[0].value);
      formData.append("project_id", projectID);
      formData.append("work_format", jobFormat.value || jobFormat[0].value);
      formData.append("description", jobDescription);
      formData.append("responsibility", jobResponsibilites);
      formData.append("requirements", jobRequirements);
      formData.append("we_offer", jobOffer);
      axios
        .put(editJob, formData)
        .then(function (response) {
          navigate(`/job/${response.data.job_id}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setProjectID(selectedOption ? selectedOption.value : ""); // Обновляем projectID или оставляем пустую строку, если ничего не выбрано
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      project: selectedOption ? "" : "Выберите ваш проект",
    }));
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <img className={styles.header__logo} src={projectLogo} />
          <div className={styles.header__text}>
            <p className={styles.header__title}>Изменение вакансии</p>
            <p className={styles.header__subtitle}>
              Нет ничего лучшего чем привлечение амбициозных специалистов
            </p>
          </div>
        </div>
        <EditJobForm
          handleSubmit={handleSubmit}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          project={project}
          setProject={setProject}
          selectedOption={selectedOption}
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
          setInputErrors={setInputErrors}
          inputErrors={inputErrors}
          handleChange={handleChange}
          projects={projects}
          currentUser={currentUser}
        />
      </div>
    </>
  );
};

export default EditJob;
