import React from "react";
import styles from "../Input/Input.module.sass";

const Input = ({
  type,
  placeholder,
  withIcon = false,
  imageSrc,
  required,
  value,
  onChange,
  minLength,
  maxlength,
  inputText,
  setInputText,
  error,
}) => {
  return withIcon ? (
    <div className={styles.input__wrapper}>
      <input
        className={styles.input__right}
        placeholder={placeholder}
        type={type}
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        required={required}
        minLength={minLength}
        maxLength={maxlength}
      />
      <img className={styles.input__img} src={imageSrc} alt="img" />
    </div>
  ) : (
    <div className={styles.input__wrapper}>
      {error && <p className={styles.input__error}>{error}</p>}
      <input
        className={styles.input}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxlength}
      />
    </div>
  );
};

export default Input;
