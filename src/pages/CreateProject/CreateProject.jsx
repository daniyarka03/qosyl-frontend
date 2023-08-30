import React, { useEffect, useState } from "react";
import styles from "./CreateProject.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import animalsImage from "../../assets/animals.png";
import Avatar from "../../components/Avatar/Avatar";
import { useNavigate } from "react-router-dom";

const projectCreate = `${import.meta.env.VITE_SERVER_URL}/api/projects/create/`;
const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/`;

const CreateProject = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [userID, setUserID] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const userToken = JSON.parse(localStorage.getItem("userInfo")).token;
  const config = { headers: { Authorization: `Bearer ${userToken}` } };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(userAPI, config);
        setUserID(response.data.user_id);
      } catch (error) {
        console.log("Failed fetching", error);
      }
    };
    getUser();
  }, []);

  
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

  const handleSubmit = (event) => {

    event.preventDefault();
    if (validateForm()) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("contact", contact);
    formData.append("author_id", userID);
    formData.append("image_src", imageSrc);
    formData.append("subscribers", "");
    axios
      .post(projectCreate, formData)
      .then(function (response) {
        navigate(`/project/${response.data.project_id}`, response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

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
          <h2 className={styles.header__title}>Создание проекта</h2>
        </div>
        <p className={styles.subheader}>
          Создайте проект и находите нужных вам специалистов.
        </p>
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
                  <option value="Игра">
                    Игра
                  </option>
                  <option value="Эко проект">
                    Эко проект
                  </option>
                  <option value="Интернет-магазин">
                    Интернет-магазин
                  </option>
                  <option value="Исследовательский проект">
                    Исследовательский проект
                  </option>
                  <option value="Творческий проект">
                    Творческий проект
                  </option>
                  <option value="Культурный проект">
                    Культурный проект
                  </option>


                  <option value="Другое">Другое</option>
                </select>
                {inputErrors.type && <p className={styles.input__error}>{inputErrors.type}</p>}
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
          {inputErrors.description && <p className={styles.input__error}>{inputErrors.description}</p>}
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
                    maxlength="100"
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
      </div>
    </>
  );
};

export default CreateProject;
