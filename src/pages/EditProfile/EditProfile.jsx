import React, { useEffect, useState } from "react";
import styles from "./EditProfile.module.sass";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { userUpdate } from "../../constants/API";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

const hobbieOptions = [
  { value: "Учеба", label: "Учеба", color: "#5243AA" },
  { value: "Чтение", label: "Чтение", color: "#FF8B00" },
  { value: "Программирование", label: "Программирование", color: "#FFC400" },
];

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
  }, [currentUser.hobbies]);

  const handleHobbies = (newHobbies) => {
    setUserHobbies(newHobbies);
  };

  useEffect(() => {
    setUserName(currentUser.name);
    setImageSrc(currentUser.avatar);
    setUserProfession(currentUser.speciality);
    setUserStudyPlace(currentUser.study_place);
  }, [currentUser]);

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
        console.log(userHobbies);
        formData.append("hobbies", JSON.stringify(userHobbies));
        formData.append("speciality", userProfession);
        formData.append("study_place", userStudyPlace);
      } else {
        formData.append("avatar", imageSrc);
        formData.append("name", userName);
        formData.append("email", currentUser.email);
        formData.append("password", 123123);
        formData.append("hobbies", userHobbies);
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
                <CreatableSelect
                  isMulti
                  options={hobbieOptions}
                  placeholder="Хобби"
                  noOptionsMessage={() => "Нет опций :/"}
                  value={userHobbies}
                  onChange={handleHobbies}
                  formatCreateLabel={() => "Создать"}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderRadius: "1.2rem",
                    }),
                    valueContainer: (baseStyles, state) => ({
                      ...baseStyles,
                      padding: "2rem",
                    }),
                    placeholder: (baseStyles, state) => ({
                      ...baseStyles,
                      fontSize: "1.25rem",
                      color: "#534e4e",
                      fontWeight: "700",
                    }),
                  }}
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
