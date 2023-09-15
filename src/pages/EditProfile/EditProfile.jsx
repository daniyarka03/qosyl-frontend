import React, { useEffect, useState } from "react";
import styles from "./EditProfile.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { userUpdate } from "../../constants/API";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";

const EditProfile = () => {
  const userInformation = JSON.parse(localStorage.getItem("userInfo"));
  const [isUserLoading, setIsUserLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useGetCurrentUser(setIsUserLoading);
  const [imageSrc, setImageSrc] = useState(currentUser.avatar);
  const [userName, setUserName] = useState(currentUser.name);
  const [userProfession, setUserProfession] = useState(currentUser.speciality);
  const [userStudyPlace, setUserStudyPlace] = useState(currentUser.study_place);
  const [userHobbies, setUserHobbies] = useState([]);

  const [inputErrors, setInputErrors] = useState({
    userName: "",
  });

  useEffect(() => {
    setUserName(currentUser.name);
    setImageSrc(currentUser.avatar);
    if (currentUser.hobbies) {
      const testArray = [];
      JSON.parse(currentUser.hobbies).forEach((hobbyName) => {
        testArray.push({
          value: hobbyName.value,
          label: hobbyName.label,
          color: "#5243AA",
        });
      });
      setUserHobbies(testArray);
    }
    if (currentUser.speciality) {
      const testArray2 = [];
      testArray2.push({
        value: currentUser.speciality,
        label: currentUser.speciality,
      });
      setUserProfession(testArray2);
    }
    setUserStudyPlace(currentUser.study_place);
  }, [currentUser]);

  const validateForm = () => {
    const errors = {};
    if (!userName) errors.userName = "Введите имя пользователя";
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
        formData.append("hobbies", JSON.stringify(userHobbies));
        formData.append("speciality", userProfession.value || userProfession[0].value);
        formData.append("study_place", userStudyPlace);
      } else {
        formData.append("avatar", imageSrc);
        formData.append("name", userName);
        formData.append("email", currentUser.email);
        formData.append("password", 123123);
        formData.append("hobbies", userHobbies);
        formData.append("speciality", userProfession.value || userProfession[0].value);
        formData.append("study_place", userStudyPlace);
      }
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
        <EditProfileForm
          handleSubmit={handleSubmit}
          userName={userName}
          setUserName={setUserName}
          userHobbies={userHobbies}
          setUserHobbies={setUserHobbies}
          userStudyPlace={userStudyPlace}
          setUserStudyPlace={setUserStudyPlace}
          userProfession={userProfession}
          setUserProfession={setUserProfession}
          inputErrors={inputErrors}
        />
      </div>
    </>
  );
};

export default EditProfile;
