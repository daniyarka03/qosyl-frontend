import React from "react";
import styles from "./SignInUp.module.sass";
import { Link } from "react-router-dom";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";

const SignIn = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img className={styles.header__logo} src={projectLogo} />
        <h2 className={styles.header__title}>Авторизация</h2>
      </div>
      <form action="" className={styles.form}>
        <Input placeholder="Имя" type="text"/>
        <Input placeholder="Пароль" type="password"/>
        <button className={styles.form__button} type="submit">
          Войти
        </button>
        <Link className={styles.form__link} to="/registration">
          Регистрация
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
