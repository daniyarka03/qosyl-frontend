import React, { useState } from "react";
import styles from "./CreateProject.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import initialAvatar from "../../assets/load-avatar.svg";
import animalsImage from "../../assets/animals.png";
import Avatar from "react-avatar-edit";

const src = "http://127.0.0.1:8000/api/projects/create/";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");

  const [imageSrc, setImageSrc] = useState(null);
  const [preview, setPreview] = useState(null);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };

  const handleSubmit = () => {
    axios
      .post(src, {
        title: title,
        description: description,
        type: type,
        image_src: imageSrc,
        contact: contact,
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
      {/* <Avatar
        width={400}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        src={imageSrc}
      />
      {preview && <img src={preview} />}
       */}
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            className={styles.header__logo}
            src={projectLogo}
            alt="qosyl.me"
          />
          <h2 className={styles.header__title}>Создание проекта</h2>
        </div>
        <p className={styles.subheader}>
          Создайте проект и находите нужных вам специалистов.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form__header}>
            <img className={styles.form__avatar} src={initialAvatar} />
            <div className={styles.form__header__inputs}>
              <div className={styles.input__wrapper}>
                <Input
                  placeholder="Название проекта"
                  type="text"
                  name="text"
                  id="projectName"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>

              <div className={styles.input__wrapper}>
                <Input
                  placeholder="Тип проекта"
                  type="text"
                  name="text"
                  id="projectType"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                />
              </div>
            </div>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Описание"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
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
                  />
                </div>
                <button className={styles.form__button} type="submit">
                  Создать
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
