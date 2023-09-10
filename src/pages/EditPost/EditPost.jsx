import React, { useEffect, useState } from "react";
import styles from "./EditPost.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUserData } from "../../actions/getCurrentUserData";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { postsAPI } from "../../constants/API";

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postID = location.pathname.split("/").pop();
  const postUpdate = `${
    import.meta.env.VITE_SERVER_URL
  }/api/posts/${postID}/update/`;
  const [authorName, setAuthorName] = useState();
  const [authorID, setAuthorID] = useState();
  const [likes, setLikes] = useState();
  const [content, setContent] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { userID } = useCurrentUserData();

  useEffect(() => {
    axios
      .get(postsAPI + postID)
      .then((data) => {
        setContent(data.data.content);
        setAuthorName(data.data.author_name);
        setAuthorID(data.data.author_id);
        setLikes(data.data.likes);
        setDataLoaded(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Failed fetching", error);
        setDataLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (dataLoaded && authorID !== userID) {
      navigate(`/posts`);
    }
  }, [dataLoaded, authorID]);

  const [inputErrors, setInputErrors] = useState({
    description: "",
  });

  const validateForm = () => {
    const errors = {};

    if (!content) {
      errors.description = "Введите описание поста";
    }
    setInputErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios
        .put(postUpdate, {
          content: content,
          author_name: authorName,
          author_id: authorID,
          likes: likes,
        })
        .then((response) => {
          navigate("/profile");
          //console.log(response);
        })
        .catch((error) => {
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
          <h2 className={styles.header__title}>Изменение поста</h2>
        </div>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {inputErrors.description && (
              <p className={styles.input__error}>{inputErrors.description}</p>
            )}
            <textarea
              className={styles.textarea}
              placeholder="Описание"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <button className={styles.form__button} type="submit">
              Изменить
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditPost;
