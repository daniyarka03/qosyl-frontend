import React from 'react'
import styles from "../Input/Input.module.sass"

const Input = ({type, placeholder}) => {
  return (
    <div className={styles.input__wrapper}>
        <input 
        className={styles.input} 
        placeholder={placeholder} 
        type={type}
        />
    </div>
  )
}

export default Input;
