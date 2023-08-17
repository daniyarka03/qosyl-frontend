import React from 'react'
import styles from "./EditPost.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Navbar from "../../components/Navbar/Navbar";

const EditPost = () => {
  return (
    <>
        <Navbar />
        <div className={styles.wrapper}>
        <div className={styles.header}>
          <img
            className={styles.header__logo}
            src={projectLogo}
            alt="qosyl.me"
          />
          <h2 className={styles.header__title}>Изменение поста</h2>
        </div>
        <form action="" className={styles.form}>
          <textarea className={styles.textarea} placeholder="Описание" />
          <button className={styles.form__button} type="submit">
            Изменить
          </button>
        </form>
      </div>
    </>
  )
}

export default EditPost