import React from 'react'
import styles from "./Notifications.module.sass";
import Navbar from '../../components/Navbar/Navbar';
import NotificationCard from '../../components/NotificationCard/NotificationCard';

const Notifications = () => {
  return (
    <div className={styles.container}>
        <Navbar/>
        <div className={styles.wrapper}>
            <p className={styles.header}>Уведомления</p>
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
        </div>
    </div>
  )
}

export default Notifications