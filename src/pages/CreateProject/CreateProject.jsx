import React from "react";
import styles from "./CreateProject.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";

const CreateProject = () => {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img
            className={styles.header__logo}
            src={projectLogo}
            alt="qosyl.me"
          />
          <h2 className={styles.header__title}>Создание проекта</h2>
        </div>
        <form action="" className={styles.form}>
          <Input
            placeholder="Название проекта"
            type="text"
            name="text"
            id="projectName"
          />
          <textarea className={styles.textarea} placeholder="Описание" />
          <button className={styles.form__button} type="submit">
            Создать
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
