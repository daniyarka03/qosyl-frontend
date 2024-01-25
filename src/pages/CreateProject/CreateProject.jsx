import React, { useEffect, useState } from "react";
import styles from "./CreateProject.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { projectCreate, userAPI } from "../../constants/API";
import CreateProjectForm from "../../components/CreateProjectForm/CreateProjectForm";

const CreateProject = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [devStage, setDevStage] = useState("");
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
    projectType: "",
    description: "",
    contact: "",
    devStage: "",
  });

  const validateForm = () => {
    const errors = {};
    if (!title) errors.title = "Введите название проекта";
    if (!projectType) errors.projectType = "Выберите тип проекта";
    if (!devStage) errors.devStage = "Выберите стадию разработки";
    if (!description) errors.description = "Введите описание проекта";
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
      formData.append("type", projectType);
      formData.append("dev_stage", devStage);
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
          <h2 className={styles.header__title}>Создание проекта</h2>
        </div>
        <p className={styles.subheader}>
          Создайте проект и находите нужных вам специалистов.
        </p>
        <CreateProjectForm
          handleSubmit={handleSubmit}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          title={title}
          setTitle={setTitle}
          projectType={projectType}
          setProjectType={setProjectType}
          devStage={devStage}
          setDevStage={setDevStage}
          description={description}
          setDescription={setDescription}
          contact={contact}
          setContact={setContact}
          validateForm={validateForm}
          inputErrors={inputErrors}
          setInputErrors={setInputErrors}
          userID={userID}
        />
      </div>
    </>
  );
};

export default CreateProject;
