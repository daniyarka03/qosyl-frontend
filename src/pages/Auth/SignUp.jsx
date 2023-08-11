import React from "react";
import styles from "./SignInUp.module.sass";
import { Link } from "react-router-dom";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";

const SignUp = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img className={styles.header__logo} src={projectLogo} />
        <h2 className={styles.header__title}>Регистрация</h2>
      </div>
      <form action="" className={styles.form}>
        <Input placeholder="Имя" type="text"/>
        <Input placeholder="Фамилия" type="text"/>
        <Input placeholder="Пароль" type="password"/>
        <Input placeholder="Подтвердить пароль" type="password"/>
        <button className={styles.form__button} type="submit">
          Регистрация
        </button>
        <Link className={styles.form__link} to="/">
          Войти в аккаунт
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
