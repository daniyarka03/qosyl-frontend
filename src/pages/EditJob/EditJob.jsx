import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./EditJob.module.sass";
import projectLogo from "../../assets/project-logo.svg";

const EditJob = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <img className={styles.header__logo} src={projectLogo} />
          <div className={styles.header__text}>
            <p className={styles.header__title}>Изменение вакансии</p>
            <p className={styles.header__subtitle}>
              Нет ничего лучшего чем привлечение амбициозных специалистов
            </p>
          </div>
        </div>
        <form className={styles.form}>
          <div className={styles.input__wrapper}>
            <select className={`${styles.input__wrapper} ${styles.select}`}>
              <option value="" disabled hidden>
                Проект
              </option>
              <option value="Социальное приложение">
                Социальное приложение
              </option>
              <option value="Образовательное приложение">
                Образовательное приложение
              </option>
              <option value="Игра">Игра</option>
              <option value="Эко проект">Эко проект</option>
              <option value="Интернет-магазин">Интернет-магазин</option>
              <option value="Исследовательский проект">
                Исследовательский проект
              </option>
              <option value="Творческий проект">Творческий проект</option>
              <option value="Культурный проект">Культурный проект</option>
            </select>
          </div>
          <div className={styles.input__wrapper}>
            <select className={`${styles.input__wrapper} ${styles.select}`}>
              <option value="" disabled hidden>
                Проект
              </option>
              <option value="Социальное приложение">
                Социальное приложение
              </option>
              <option value="Образовательное приложение">
                Образовательное приложение
              </option>
              <option value="Игра">Игра</option>
              <option value="Эко проект">Эко проект</option>
              <option value="Интернет-магазин">Интернет-магазин</option>
              <option value="Исследовательский проект">
                Исследовательский проект
              </option>
              <option value="Творческий проект">Творческий проект</option>
              <option value="Культурный проект">Культурный проект</option>
            </select>
          </div>
          <div className={styles.input__wrapper}>
            <select className={`${styles.input__wrapper} ${styles.select}`}>
              <option value="" disabled hidden>
                Проект
              </option>
              <option value="Социальное приложение">
                Социальное приложение
              </option>
              <option value="Образовательное приложение">
                Образовательное приложение
              </option>
              <option value="Игра">Игра</option>
              <option value="Эко проект">Эко проект</option>
              <option value="Интернет-магазин">Интернет-магазин</option>
              <option value="Исследовательский проект">
                Исследовательский проект
              </option>
              <option value="Творческий проект">Творческий проект</option>
              <option value="Культурный проект">Культурный проект</option>
            </select>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Описание"
            maxLength="800"
          />
          <textarea
            className={styles.textarea}
            placeholder="Обязанности"
            maxLength="800"
          />
          <textarea
            className={styles.textarea}
            placeholder="Требования"
            maxLength="800"
          />
          <textarea
            className={styles.textarea}
            placeholder="Мы предлагаем"
            maxLength="800"
          />
        </form>
        <button className={styles.form__button} type="submit">
          Изменить
        </button>
      </div>
    </>
  );
};

export default EditJob;
