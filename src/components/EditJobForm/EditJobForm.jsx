import React from "react";
import styles from "./EditJobForm.module.sass";
import Select from "react-select";
import selectStyles from "../../constants/selectStyles";
import { jobFormatOptions, jobTitleOptions } from "../../constants/options";
const EditJobForm = ({
  handleSubmit,
  jobTitle,
  setJobTitle,
  project,
  setProject,
  selectedOption,
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
  setInputErrors,
  handleChange,
  projects,
  currentUser,
}) => {
  const jobProjectOptions = projects
    .filter((project) => project.author_id === currentUser.user_id)
    .map((project) => ({
      value: project.project_id,
      label: project.title,
    }));

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.select__wrapper}>
        <Select
          isSearchable={true}
          noOptionsMessage={() => "Вакансия не найдена :("}
          placeholder={"Вакансия"}
          options={jobTitleOptions}
          value={jobTitle}
          onChange={(value) => {
            setJobTitle(value);
            setInputErrors((prevErrors) => ({
              ...prevErrors,
              jobTitle: value.value ? "" : "Выберите вакансию",
            }));
          }}
          styles={selectStyles}
        />
        {inputErrors.jobTitle && (
          <p className={styles.input__error}>{inputErrors.jobTitle}</p>
        )}
      </div>
      <div className={styles.select__wrapper}>
        <Select
          styles={selectStyles}
          value={selectedOption} // Здесь selectedOption - это текущее выбранное значение
          onChange={handleChange} // Функция обработки изменений
          options={jobProjectOptions} // Массив опций для выбора
          placeholder="Проект" // Текст-плейсхолдер
        />
        {inputErrors.project && (
          <p className={styles.input__error}>{inputErrors.project}</p>
        )}
      </div>
      <div className={styles.select__wrapper}>
        <Select
          placeholder={"Формат"}
          options={jobFormatOptions}
          value={jobFormat}
          onChange={(value) => {
            setJobFormat(value);
            setInputErrors((prevErrors) => ({
              ...prevErrors,
              jobFormat: value.value ? "" : "Выберите формат",
            }));
          }}
          styles={selectStyles}
        />
        {inputErrors.jobFormat && (
          <p className={styles.input__error}>{inputErrors.jobFormat}</p>
        )}
      </div>

      <textarea
        className={styles.textarea}
        placeholder="Описание"
        value={jobDescription}
        onChange={(event) => {
          setJobDescription(event.target.value);
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            jobDescription: event.target.value
              ? ""
              : "Введите описание вакансии",
          }));
        }}
        maxLength="800"
      />
      {inputErrors.jobDescription && (
        <p className={styles.input__error}>{inputErrors.jobDescription}</p>
      )}
      <textarea
        className={styles.textarea}
        placeholder="Обязанности"
        value={jobResponsibilites}
        onChange={(event) => {
          setJobResponsibilities(event.target.value);
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            jobResponsibilites: event.target.value
              ? ""
              : "Введите обязанности вакансии",
          }));
        }}
        maxLength="800"
      />
      {inputErrors.jobResponsibilites && (
        <p className={styles.input__error}>{inputErrors.jobResponsibilites}</p>
      )}
      <textarea
        className={styles.textarea}
        placeholder="Требования"
        value={jobRequirements}
        onChange={(event) => {
          setJobRequirements(event.target.value);
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            jobRequirements: event.target.value
              ? ""
              : "Введите требования вакансии",
          }));
        }}
        maxLength="800"
      />
      {inputErrors.jobRequirements && (
        <p className={styles.input__error}>{inputErrors.jobRequirements}</p>
      )}
      <textarea
        className={styles.textarea}
        placeholder="Мы предлагаем"
        value={jobOffer}
        onChange={(event) => {
          setJobOffer(event.target.value);
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            jobOffer: event.target.value ? "" : "Введите условия вакансии",
          }));
        }}
        maxLength="800"
      />
      {inputErrors.jobOffer && (
        <p className={styles.input__error}>{inputErrors.jobOffer}</p>
      )}
      <button className={styles.form__button} type="submit">
        Изменить
      </button>
    </form>
  );
};

export default EditJobForm;
