import React, { useEffect, useState } from "react";
import styles from "./CreateStudentsClub.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import animalsImage from "../../assets/animals.png";
import Avatar from "../../components/Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import selectStyles from "../../constants/selectStyles";
import { universitiesOptions } from "../../constants/options";

const clubCreate = `${
  import.meta.env.VITE_SERVER_URL
}/api/students_clubs/create/`;
const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/`;

const CreateStudentsClub = () => {
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
    if (!title) errors.title = "Введите название клуба";
    if (!type) errors.type = "Выберите университет";
    if (!description) errors.description = "Введите описание клуба";
    if (!contact) errors.contact = "Введите контактные данные";
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("related_by_uni", type);
      formData.append("contact", contact);
      formData.append("author_id", userID);
      formData.append("image_src", imageSrc);
      formData.append("members", "");
      axios
        .post(clubCreate, formData)
        .then(function (response) {
          navigate(
            `/students-club/${response.data.students_club_id}`,
            response.data
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.header__title}>Создание студенческого клуба</h2>
        </div>
        <p className={styles.subheader}>
          Создайте собственный студенческий клуб и найдите единомышленников
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form__header}>
            <Avatar setImageSrc={setImageSrc} />
            <div className={styles.form__header__inputs}>
              <div className={styles.input__wrapper}>
                <Input
                  placeholder="Название клуба"
                  type="text"
                  name="text"
                  id="clubName"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                    setInputErrors((prevErrors) => ({
                      ...prevErrors,
                      title: event.target.value ? "" : "Введите название клуба",
                    }));
                  }}
                  maxlength="100"
                  error={inputErrors.title}
                />
              </div>

              <div className={styles.input__wrapper}>
                {inputErrors.type && (
                  <p className={styles.input__error}>{inputErrors.type}</p>
                )}
                <Select
                  isSearchable
                  noOptionsMessage={() => "Университет не найден :("}
                  placeholder="Университет"
                  options={universitiesOptions}
                  styles={selectStyles}
                  onChange={(value) => {
                    setType(value.value);
                    setInputErrors((prevErrors) => ({
                      ...prevErrors,
                      type: value.value ? "" : "Выберите университет",
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Описание"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setInputErrors((prevErrors) => ({
                ...prevErrors,
                description: event.target.value ? "" : "Введите описание клуба",
              }));
            }}
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
                    id="clubContact"
                    value={contact}
                    onChange={(event) => {
                      setContact(event.target.value);
                      setInputErrors((prevErrors) => ({
                        ...prevErrors,
                        contact: event.target.value
                          ? ""
                          : "Введите контактные данные",
                      }));
                    }}
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

export default CreateStudentsClub;
