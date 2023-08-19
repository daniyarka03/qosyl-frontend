import React, { useState } from "react";
import styles from "./CreateProject.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const src = "http://127.0.0.1:8000/api/projects/create/";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    axios
      .post(src, {
        title: title,
        description: description,
        type: "Social app",
        image_src: "1212312312321",
        contact: "f0k u",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            placeholder="Название проекта"
            type="text"
            name="text"
            id="projectName"
            handleChange={handleInputChange}
          />
          <textarea
            className={styles.textarea}
            placeholder="Описание"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button className={styles.form__button} type="submit">
            Создать
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
