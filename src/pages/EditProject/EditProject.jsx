import React, { useEffect, useState } from "react";
import styles from "./EditProject.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUserData } from "../../actions/getCurrentUserData";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { projectsAPI } from "../../constants/API";
import EditProjectForm from "../../components/EditProjectForm/EditProjectForm";

const EditProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectID = location.pathname.split("/").pop();
  const src = `${
    import.meta.env.VITE_SERVER_URL
  }/api/projects/${projectID}/update/`;

  const [title, setTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [devStage, setDevStage] = useState("");
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

  useEffect(() => {
    axios
      .get(projectsAPI + projectID)
      .then((response) => {
        setTitle(response.data.title);

        const testArray = [];
        testArray.push({
          value: response.data.type,
          label: response.data.type,
        });
        setProjectType(testArray);

        const testArray2 = [];
        testArray2.push({
          value: response.data.dev_stage,
          label: response.data.dev_stage,
        });
        setDevStage(testArray2);

        setDescription(response.data.description);
        setContact(response.data.contact);
        setAuthorID(response.data.author_id);
        setImageSrc(response.data.image_src);
        setSubscribers(response.data.subscribers);
        setDataLoaded(true);
        setIsLoading(false);
      })
      .catch((error) => {
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
        formData.append("type", projectType.value || projectType[0].value);
        formData.append("dev_stage", devStage.value || devStage[0].value);
        formData.append("contact", contact);
        formData.append("author_id", authorID);
        formData.append("image_src", relativePath);
        formData.append("subscribers", subscribers);
      } else {
        formData.append("title", title);
        formData.append("description", description);
        formData.append("type", projectType.value || projectType[0].value);
        formData.append("dev_stage", devStage.value || devStage[0].value);
        formData.append("contact", contact);
        formData.append("author_id", authorID);
        formData.append("image_src", imageSrc);
        formData.append("subscribers", subscribers);
      }

      axios
        .put(src, formData)
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
          <EditProjectForm
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
        )}
      </div>
    </>
  );
};

export default EditProject;
