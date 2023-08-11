import React from "react";
import styles from "./SignInUp.module.sass";
import { Link } from "react-router-dom";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";

const SignUp = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img className={styles.header__logo} src={projectLogo} alt="qosyl.me" />
        <h2 className={styles.header__title}>Регистрация</h2>
      </div>

      <form action="#" className={styles.form}>
        <Input placeholder="Имя" type="text" id="signUpFormFirstName" name="firstname" />
        <Input placeholder="Email" type="text" id="signUpFormEmail" name="email" />
        <Input placeholder="Пароль" type="password" id="signUpFormPassword" name="password" />
        <Input placeholder="Подтвердить пароль" type="password" id="signUpFormCofirmPassword" name="confirm_password"/>
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
