import React, {useState} from "react";
import styles from "./SignInUp.module.sass";
import { Link } from "react-router-dom";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
      e.preventDefault();
      const response = await fetch('http://127.0.0.1:8000/auth/token/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({username: username,
              password: password,}),
      });

      if (response.ok) {
          alert('Nice')
      } else {
          alert('Bad')
          console.log(JSON.stringify({username: username,
              email: email,
              password: password,}))
      }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img className={styles.header__logo} src={projectLogo} alt="qosyl.me" />
        <h2 className={styles.header__title}>Авторизация</h2>
      </div>
      <form action="#" onSubmit={onSubmitHandler} className={styles.form}>
        <Input placeholder="Email" type="email" name="email" id="signInFormEmail" value={email}
               onChange={(e) => setEmail(e.target.value)}/>
        <Input placeholder="Пароль" type="password" name="password" id="signInFormPassword" value={password}
               onChange={(e) => setPassword(e.target.value)}/>
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
