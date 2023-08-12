import React from "react";
import styles from "../Input/Input.module.sass";

const Input = ({ type, placeholder, withIcon = false, imageSrc, onChange, value }) => {
  return withIcon ? (
    <div className={styles.input__wrapper}>
      <input
        className={styles.input__right}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
      />
      <img className={styles.input__img} src={imageSrc} />
    </div>
  ) : (
    <div className={styles.input__wrapper}>
      <input className={styles.input} placeholder={placeholder} type={type}  onChange={onChange}
             value={value} />
    </div>
  );
};

export default Input;
