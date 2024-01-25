import React, { useEffect, useState } from "react";
import styles from "./CreatePost.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { postCreate, userAPI } from "../../constants/API";

const CreatePost = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(true);
  const { currentUser } = useGetCurrentUser(setIsUserLoading);

  const [inputErrors, setInputErrors] = useState({
    description: "",
  });

  const validateForm = () => {
    const errors = {};
    if (!description) errors.description = "Введите описание поста";
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios
        .post(postCreate, {
          content: description,
          author_name: currentUser.name,
          author_id: currentUser.user_id,
          likes: [],
          comments: [],
        })
        .then(function (response) {
          navigate("/profile");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
          <h2 className={styles.header__title}>Создание поста</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {inputErrors.description && (
            <p className={styles.input__error}>{inputErrors.description}</p>
          )}
          <textarea
            className={styles.textarea}
            placeholder="Описание поста"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button className={styles.form__button} type="submit">
            Добавить
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
