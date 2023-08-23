import React, { useEffect, useState } from "react";
import styles from "./EditProfile.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
        <form className={styles.form}>
          <div className={styles.form__header}>
            <Avatar />
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
