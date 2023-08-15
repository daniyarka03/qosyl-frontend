import React from "react";
import styles from "../Input/Input.module.sass";

const Input = ({ type, placeholder, withIcon = false, imageSrc, required, value, onChange, minLength }) => {
  return withIcon ? (
    <div className={styles.input__wrapper}>
      <input
        className={styles.input__right}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
      />
      <img className={styles.input__img} src={imageSrc} />
    </div>
  ) : (
    <div className={styles.input__wrapper}>
      <input className={styles.input} placeholder={placeholder} type={type}  value={value}
             onChange={onChange}
             required={required} />
    </div>
  );
};

export default Input;
