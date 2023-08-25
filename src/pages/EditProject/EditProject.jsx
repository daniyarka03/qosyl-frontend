import React, { useEffect, useState } from "react";
import styles from "./EditProject.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import animalsImage from "../../assets/animals.png";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { useCurrentUserData } from "../../actions/getCurrentUserData";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";

const projectsAPI = `${import.meta.env.VITE_SERVER_URL}/api/projects/`;

const EditProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectID = location.pathname.split("/").pop();
  const src = `${
    import.meta.env.VITE_SERVER_URL
  }/api/projects/${projectID}/update/`;

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [authorID, setAuthorID] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [subscribers, setSubscribers] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { userID } = useCurrentUserData(); 
  // console.log(authorID, userID)

  useEffect(() => {
    axios.get(projectsAPI + projectID).then(response => {
      setTitle(response.data.title);
      setType(response.data.type);
      setDescription(response.data.description);
      setContact(response.data.contact);
      setAuthorID(response.data.author_id);
      setImageSrc(response.data.image_src);
      setSubscribers(response.data.subscribers);
      setIsLoading(false)
    }).catch (error => {
      console.log("Failed fetching", error);
    }) 
  }, [projectID]);

  useEffect(() => {
    if (authorID !== userID) {
      navigate("/profile/");
    }
  }, [authorID]);

  if (isLoading) {
    return <CardSkeleton />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("contact", contact);
    formData.append("author_id", authorID);
    formData.append("image_src", imageSrc);
    formData.append("subscribers", subscribers);
    navigate(`/project/${projectID}`);
    axios
      .put(src, formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("An error occurred:", error);
      });
  };
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            className={styles.header__logo}
            src={projectLogo}
            alt="qosyl.me"
          />
          <h2 className={styles.header__title}>Изменение проекта</h2>
        </div>
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
                />
              </div>

              <div className={styles.input__wrapper}>
                <select
                  className={`${styles.input__wrapper} ${styles.select}`}
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="" disabled hidden>
                    Тип проекта
                  </option>
                  <option value="Социальное приложение">
                    Социальное приложение
                  </option>
                  <option value="Образовательное приложение">
                    Образовательное приложение
                  </option>
                  <option value="Другое">Другое</option>
                </select>
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
                    maxlength={30}
                  />
                </div>
                <button className={styles.form__button} type="submit">
                  Изменить
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProject;
