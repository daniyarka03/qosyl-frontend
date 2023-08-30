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
import { projectsAPI } from "../../constants/API";

const EditProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectID = location.pathname.split("/").pop();
  const projectUpdate = `${
    import.meta.env.VITE_SERVER_URL
  }/api/projects/${projectID}/update/`;

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [authorID, setAuthorID] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [subscribers, setSubscribers] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { userID } = useCurrentUserData();

  const [inputErrors, setInputErrors] = useState({
    title: "",
    type: "",
    description: "",
    contact: "",
  });

  const validateForm = () => {
    const errors = {};

    if (!title) {
      errors.title = "Введите название проекта";
    }

    if (!type) {
      errors.type = "Выберите тип проекта";
    }

    if (!description) {
      errors.description = "Введите описание проекта";
    }

    if (!contact) {
      errors.contact = "Введите контактные данные";
    }

    setInputErrors(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    axios
      .get(projectsAPI + projectID)
      .then((response) => {
        setTitle(response.data.title);
        setType(response.data.type);
        setDescription(response.data.description);
        setContact(response.data.contact);
        setAuthorID(response.data.author_id);
        setImageSrc(response.data.image_src);
        setSubscribers(response.data.subscribers);
        setDataLoaded(true);
        setIsLoading(false);
      })
      .catch((error) => {
        //console.log("Failed fetching", error);
        setDataLoaded(true);
      });
  }, [projectID]);

  useEffect(() => {
    if (dataLoaded && authorID !== userID) {
      navigate(`/project/${projectID}`);
    }
  }, [dataLoaded, authorID]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      if (typeof imageSrc == "string") {
        const mediaRoot = "/cXQYMmoJTmnj79aRVNDw16rkoGW/media";
        const relativePath = imageSrc.replace(mediaRoot, "");
        formData.append("title", title);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("contact", contact);
        formData.append("author_id", authorID);
        formData.append("image_src", relativePath);
        formData.append("subscribers", subscribers);
      } else {
        formData.append("title", title);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("contact", contact);
        formData.append("author_id", authorID);
        formData.append("image_src", imageSrc);
        formData.append("subscribers", subscribers);
      }

      axios
        .put(projectUpdate, formData)
        .then(function (response) {
          navigate(`/project/${projectID}`);
        })
        .catch(function (error) {
          console.log("An error occurred:", error);
        });
    }
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
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form__header}>
              <Avatar imageSrc={imageSrc} setImageSrc={setImageSrc} />
              <div className={styles.form__header__inputs}>
                <div className={styles.input__wrapper}>
                  <Input
                    placeholder="Название проекта"
                    type="text"
                    name="text"
                    id="projectName"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    error={inputErrors.title}
                  />
                </div>

                <div className={styles.input__wrapper}>
                  <select
                    className={`${styles.input__wrapper} ${styles.select}`}
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    error={inputErrors.type}
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
                    <option value="Игра">Игра</option>
                    <option value="Эко проект">Эко проект</option>
                    <option value="Интернет-магазин">Интернет-магазин</option>
                    <option value="Исследовательский проект">
                      Исследовательский проект
                    </option>
                    <option value="Творческий проект">Творческий проект</option>
                    <option value="Культурный проект">Культурный проект</option>
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
                    Изменить
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default EditProject;
