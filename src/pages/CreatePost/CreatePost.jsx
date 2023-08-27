import React, { useEffect, useState } from "react";
import styles from "./CreatePost.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const postCreate = `${import.meta.env.VITE_SERVER_URL}/api/posts/create/`;
const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/`;

const CreatePost = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [userID, setUserID] = useState(0);

  const userToken = JSON.parse(localStorage.getItem("userInfo")).token;
  const config = { headers: { Authorization: `Bearer ${userToken}` } };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(userAPI, config);
        setUserID(response.data.user_id);
        setAuthor(response.data.name);
      } catch (error) {
        console.log("Failed fetching", error);
      }
    };
    getUser();
  }, []);

  const [inputErrors, setInputErrors] = useState({
    description: "",
  });

  const validateForm = () => {
    const errors = {};
  
    if (!description) {
      errors.description = "Введите описание поста";
    }
    setInputErrors(errors);
  
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
    axios
      .post(postCreate, {
        content: description,
        author_name: author,
        author_id: userID,
        likes: [],
        comments: [],
      })
      .then(function (response) {
        navigate("/profile");
        console.log(response);
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
        {inputErrors.description && <p className={styles.input__error}>{inputErrors.description}</p>}
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
