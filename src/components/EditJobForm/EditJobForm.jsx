import React from "react";
import styles from "./EditJobForm.module.sass";
import Input from "../Input/Input";
const EditJobForm = ({
  handleSubmit,
  jobTitle,
  setJobTitle,
  project,
  setProject,
  jobFormat,
  setJobFormat,
  jobDescription,
  setJobDescription,
  jobResponsibilites,
  setJobResponsibilities,
  jobRequirements,
  setJobRequirements,
  jobOffer,
  setJobOffer,
  validateForm,
  inputErrors,
  handleChange,
  projects,
  currentUser,
}) => {
  return (
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
            error={inputErrors.jobTitle}
          />
        </div>
      </div>
      <select className={styles.select} value={project} onChange={handleChange}>
        <option value="" disabled hidden>
          Проект
        </option>

        {}
        {projects.filter((project) => project.author_id === currentUser.user_id)
          .length > 0 ? (
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
  );
};

export default EditJobForm;
