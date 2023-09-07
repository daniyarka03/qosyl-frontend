import React, { useEffect, useState } from "react";
import styles from "./EditProfile.module.sass";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { userUpdate } from "../../constants/API";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";

const EditProfile = () => {
  const userInformation = JSON.parse(localStorage.getItem("userInfo"));
  const [isUserLoading, setIsUserLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useGetCurrentUser(setIsUserLoading);
  const [imageSrc, setImageSrc] = useState(currentUser.avatar);
  const [userName, setUserName] = useState(currentUser.name);
  const [userHobby, setUserHobby] = useState(currentUser.hobbies);
  const [userProfession, setUserProfession] = useState(currentUser.speciality);
  const [userStudyPlace, setUserStudyPlace] = useState(currentUser.study_place);

  
  const [inputErrors, setInputErrors] = useState({
    userName: "",
  });

  useEffect(() => {
    setUserName(currentUser.name)
    setImageSrc(currentUser.avatar)
    setUserHobby(currentUser.hobbies)
    setUserProfession(currentUser.speciality)
    setUserStudyPlace(currentUser.study_place)
  }, [currentUser])

  const validateForm = () => {
    const errors = {};
    if (!userName) {
      errors.userName = "Введите имя пользователя";
    }
    setInputErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      if (typeof imageSrc == "string") {
        const mediaRoot = "/cXQYMmoJTmnj79aRVNDw16rkoGW/media";
        const relativePath = imageSrc.replace(mediaRoot, "");
        formData.append("avatar", relativePath);
        formData.append("name", userName);
        formData.append("email", currentUser.email);
        formData.append("password", 123123);
        formData.append("hobbies", userHobby);
        formData.append("speciality", userProfession);
        formData.append("study_place", userStudyPlace);
      } else {
        formData.append("avatar", imageSrc);
        formData.append("name", userName);
        formData.append("email", currentUser.email);
        formData.append("password", 123123);
        formData.append("hobbies", userHobby);
        formData.append("speciality", userProfession);
        formData.append("study_place", userStudyPlace);
      }

      //formData.append("images_src", imageSrc)
      axios({
        method: "put",
        url: userUpdate,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInformation.token}`,
        },
      })
        .then(function (response) {
          //console.log(response);
          navigate("/profile");
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
          <Avatar imageSrc={imageSrc} setImageSrc={setImageSrc} />
          <h2 className={styles.header__title}>Изменение профиля</h2>
        </div>
        <form
          className={styles.form}
          onSubmit={(e) => handleSubmit(e, validateForm)}
        >
          <div className={styles.form__header}>
            <div className={styles.form__header__inputs}>
              <div className={styles.input__wrapper}>
                <Input
                  placeholder="Имя пользователя"
                  type="text"
                  name="text"
                  id="userName"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  error={inputErrors.userName}
                  maxlength={30}
                />
              </div>
              <div className={styles.input__wrapper}>
                <Input
                  placeholder="Хобби"
                  type="text"
                  name="text"
                  id="userHobby"
                  value={userHobby}
                  onChange={(event) => setUserHobby(event.target.value)}
                  maxlength={30}
                />
              </div>
              <div className={styles.input__wrapper}>
                <Input
                  placeholder="Место учебы"
                  type="text"
                  name="text"
                  id="userStudyPlace"
                  value={userStudyPlace}
                  onChange={(event) => setUserStudyPlace(event.target.value)}
                  maxlength={30}
                />
              </div>
              <div className={styles.input__wrapper}>
                <Input
                  placeholder="Специальность"
                  type="text"
                  name="text"
                  id="userProfession"
                  value={userProfession}
                  onChange={(event) => setUserProfession(event.target.value)}
                  maxlength={30}
                />
              </div>
            </div>
          </div>
          <button className={styles.form__button} type="submit">
            Изменить
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
