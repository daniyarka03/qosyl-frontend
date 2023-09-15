import React, {useEffect, useState} from "react";
import styles from "./SignInUp.module.sass";
import {Link, useNavigate} from "react-router-dom";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";
import {register} from "../../actions/userActions.js";
import {useDispatch, useSelector} from "react-redux";

const SignUp = ({location, history}) => {



    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const {error, loading, userInfo} = userRegister;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: name,
        email: email,
        password: password,
    });

    useEffect(() => {
        if (userInfo) {
            window.location.replace("/profile");
        }
    }, [navigate, userInfo]);

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
        setMessage('Заполните все поля');
        console.log(name, email, password, confirmPassword)
    } else {
        if (password !== confirmPassword) {
            setMessage('Пароли не совпадают');
        } else {
            dispatch(register(name, email, password))

        }
    }


};

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img className={styles.header__logo} src={projectLogo} alt="qosyl.me" />
        <h2 className={styles.header__title}>Регистрация</h2>
      </div>
        {message && <div className={styles.error_message}>{message}</div>}
      <form action="#" className={styles.form} onSubmit={handleSubmit}>
        <Input placeholder="Имя" type="text" id="signUpFormFirstName" name="name" value={name} onChange={(e) => setName(e.target.value)} class={styles.input__register}  />
        <Input placeholder="Email" type="text" id="signUpFormEmail" name="email" value={email} onChange={(e) => setEmail(e.target.value)} class={styles.input__register} />
        <Input placeholder="Пароль" type="password" id="signUpFormPassword" name="password" value={password} onChange={(e) => setPassword(e.target.value)} class={styles.input__register} />
        <Input placeholder="Подтвердить пароль" type="password" id="signUpFormCofirmPassword" name="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} class={styles.input__register}/>

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
