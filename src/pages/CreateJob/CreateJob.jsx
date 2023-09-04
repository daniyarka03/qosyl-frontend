import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./CreateJob.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import axios from "axios";
import Input from "../../components/Input/Input";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useGetProjects from "../../hooks/useGetProjects";
import { useNavigate } from "react-router-dom";

const createJob =
  "https://qosyl.me:8000/cXQYMmoJTmnj79aRVNDw16rkoGW/api/jobs/create/";

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
  const handleSubmit = (event) => {
    event.preventDefault();
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
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input__wrapper}>
            <div className={styles.input__wrapper}>
              <Input
                placeholder="Название вакансии"
                type="text"
                name="text"
                id="jobName"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                maxlength="100"
              />
            </div>
          </div>
          <select
            className={styles.select}
            value={project}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Проект
            </option>

            {}
            {projects.filter(
              (project) => project.author_id === currentUser.user_id
            ).length > 0 ? (
              projects
                .filter((project) => project.author_id === currentUser.user_id)
                .map((project) => {
                  return (
                    <option
                      key={project.project_id}
                      value={project.title}
                      data-projectid={project.project_id} // Add this attribute to store project ID
                    >
                      {project.title}
                    </option>
                  );
                })
            ) : (
              <option value="" onClick={() => navigate("/create-project")}>
                Проектов нету :/
              </option>
            )}
          </select>
          <select
            className={styles.select}
            value={jobFormat}
            onChange={(event) => setJobFormat(event.target.value)}
          >
            <option value="" disabled hidden>
              Формат работы
            </option>
            <option value="Очный">Очный</option>
            <option value="Удаленный">Удаленный</option>
            <option value="Гибридный">Гибридный</option>
          </select>
          <textarea
            className={styles.textarea}
            placeholder="Описание"
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            maxLength="800"
          />
          <textarea
            className={styles.textarea}
            placeholder="Обязанности"
            value={jobResponsibilites}
            onChange={(event) => setJobResponsibilities(event.target.value)}
            maxLength="800"
          />
          <textarea
            className={styles.textarea}
            placeholder="Требования"
            value={jobRequirements}
            onChange={(event) => setJobRequirements(event.target.value)}
            maxLength="800"
          />
          <textarea
            className={styles.textarea}
            placeholder="Мы предлагаем"
            value={jobOffer}
            onChange={(event) => setJobOffer(event.target.value)}
            maxLength="800"
          />
          <button className={styles.form__button} type="submit">
            Создать
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateJob;
