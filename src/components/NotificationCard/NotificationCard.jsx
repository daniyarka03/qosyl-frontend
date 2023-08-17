import React from 'react'
import styles from "./NotificationCard.module.sass";
import cleekLogo from "../../assets/cleek-logo.png";

const NotificationCard = () => {
  return (
    <div className={styles.notification}>
        <div className={styles.notification__new}>new</div>
        <div className={styles.wrapper}>
            <img className={styles.notification__img} src={cleekLogo}/>
            <div className={styles.notification__text}>
                <p className={styles.notification__title}>Заявка на вступление</p>
                <p className={styles.notification__subtitle}>Поток</p>
            </div>
        </div>
    </div>
  )
}

export default NotificationCard