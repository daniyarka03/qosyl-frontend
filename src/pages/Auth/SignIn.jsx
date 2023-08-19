    import React, {useEffect, useState} from "react";
    import styles from "./SignInUp.module.sass";
    import {Link, useNavigate} from "react-router-dom";
    import projectLogo from "../../assets/project-logo.svg";
    import Input from "../../components/Input/Input";
    import {connect, useDispatch, useSelector} from "react-redux";
    import {login} from "../../actions/UserActions";


    const SignIn = () => {



        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const URL = "127.0.0.1:8000";
        const navigate = useNavigate();

        const dispatch = useDispatch();

        const userLogin = useSelector(state => state.userLogin);
        const { error, loading, userInfo } = userLogin;

        useEffect(() => {
           if (userInfo) {
               navigate("/projects");
           }
        }, [navigate, userInfo]);

        const onSubmit = e => {
            e.preventDefault();
            dispatch(login(email, password))
            console.log(email + '/' + password)

        };





      return (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <img className={styles.header__logo} src={projectLogo} alt="qosyl.me" />
            <h2 className={styles.header__title}>Авторизация</h2>
          </div>
          <form action="" className={styles.form} onSubmit={e => onSubmit(e)}>
            <Input
                placeholder="Email"
                type="email"
                name="email"
                id="signInFormEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                placeholder="Пароль"
                type="password"
                name="password"
                id="signInFormPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="6"
                required
            />
            <button className={styles.form__button} type="submit">
              Войти
            </button>
            <Link className={styles.form__link} to="/registration">
              Регистрация
            </Link>
              <Link className={styles.form__link} to="/registration">
                  Забыли пароль?
              </Link>
          </form>
        </div>
      );
    };



    export default SignIn;
