import React from "react";
import styles from "../Input/Input.module.sass";

const Input = ({ type, placeholder, withIcon = false, imageSrc }) => {
  return withIcon ? (
    <div className={styles.input__wrapper}>
      <input
        className={styles.input__right}
        placeholder={placeholder}
        type={type}
      />
      <img className={styles.input__img} src={imageSrc} />
    </div>
  ) : (
    <div className={styles.input__wrapper}>
      <input className={styles.input} placeholder={placeholder} type={type} />
    </div>
  );
};

export default Input;
