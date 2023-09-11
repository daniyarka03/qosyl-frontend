import React from "react";
import Input from "../Input/Input";
import Avatar from "../../components/Avatar/Avatar";
import Select from "react-select";
import {
  projectTypeOptions,
  projectStageOptions,
} from "../../constants/options";
import selectStyles from "../../constants/selectStyles";
import styles from "./CreateProjectForm.module.sass";
import animalsImage from "../../assets/animals.png";

const CreateProjectForm = ({
  handleSubmit,
  imageSrc,
  setImageSrc,
  title,
  setTitle,
  projectType,
  setProjectType,
  devStage,
  setDevStage,
  description,
  setDescription,
  contact,
  setContact,
  userID,
  validateForm,
  inputErrors,
}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__header}>
        <Avatar setImageSrc={setImageSrc} />
        <div className={styles.form__header__inputs}>
          <div className={styles.input__wrapper}>
            <Input
              placeholder="Название проекта"
              type="text"
              name="text"
              id="projectName"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxlength="100"
              error={inputErrors.title}
            />
          </div>
          <div className={styles.select__wrapper}>
            {inputErrors.projectType && (
              <p className={styles.input__error}>{inputErrors.projectType}</p>
            )}
            <Select
              isSearchable={false}
              placeholder={"Тип проекта"}
              options={projectTypeOptions}
              onChange={(value) => {
                setProjectType(value.value);
              }}
              styles={selectStyles}
            />
          </div>
          <div className={styles.select__wrapper}>
            {inputErrors.devStage && (
              <p className={styles.input__error}>{inputErrors.devStage}</p>
            )}
            <Select
              isSearchable={false}
              placeholder={"Стадия проекта"}
              options={projectStageOptions}
              onChange={(value) => {
                setDevStage(value.value);
              }}
              styles={selectStyles}
            />
          </div>
        </div>
      </div>
      <textarea
        className={styles.textarea}
        placeholder="Описание"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        maxLength="800"
      />
      {inputErrors.description && (
        <p className={styles.input__error}>{inputErrors.description}</p>
      )}
      <div className={styles.form__contacts}>
        <p className={styles.contacts__header}>Контакты</p>
        <div className={styles.contacts__info}>
          <img className={styles.contacts__image} src={animalsImage} />
          <div className={styles.contacts__actions}>
            <div className={styles.input__wrapper}>
              <Input
                placeholder="Впиши любой контакт"
                type="text"
                name="text"
                id="projectContact"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                maxlength={30}
                error={inputErrors.contact}
              />
            </div>
            <button className={styles.form__button} type="submit">
              Создать
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProjectForm;
