import React, { useEffect, useState } from "react";
import styles from "./CreatePost.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const whereToUpdate = "http://127.0.0.1:8000/api/posts/create/";
const src = "http://127.0.0.1:8000/api/users/profile/";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [userID, setUserID] = useState(0)
  const handleChange = (event) => setDescription(event.target.value);

  const userToken = JSON.parse(localStorage.getItem("userInfo")).token
  const config = {headers: {'Authorization': `Bearer ${userToken}`},}

  useEffect(() => {
    const getUserID = async () => {
      try { 
        const response = await axios.get(src, config)
        setUserID(response.data.id)
      } catch (error) {
        console.log("Failed fetching", error)
      }
    }
    getUserID()
  }, [])
  const handleSubmit = () => {
    axios
      .post(whereToUpdate, {
        content: description,
        author: userID,
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
          <h2 className={styles.header__title}>Создание поста</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            placeholder="Описание поста"
            value={description}
            onChange={handleChange}
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
