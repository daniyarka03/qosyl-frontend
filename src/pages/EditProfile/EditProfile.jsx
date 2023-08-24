import React, { useEffect, useState } from "react";
import styles from "./EditProfile.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";

const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/`;
const userUpdate = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/edit/`;

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [user, setUser] = useState({});
  const [imageSrc, setImageSrc] = useState("");

  const userInformation = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: { Authorization: `Bearer ${userInformation.token}` },
  };

  useEffect(() => {
    axios.get(userAPI, config).then((data) => {
      setUser(data.data);
      setImageSrc(data.data.avatar);
    });
  }, []);
  console.log(user);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", imageSrc);
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", 123123);
    console.log(imageSrc);

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
        console.log(response);
        navigate("/profile");
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
          <h2 className={styles.header__title}>Изменение профиля</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form__header}>
            <Avatar setImageSrc={setImageSrc} />
            <div className={styles.form__header__inputs}>
              <div className={styles.input__wrapper}>
                <Input
                  placeholder="Имя проекта"
                  type="text"
                  name="text"
                  id="projectName"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
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
