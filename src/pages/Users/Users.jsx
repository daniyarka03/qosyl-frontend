import React from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import styles from "./Users.module.sass";
import Input from "../../components/Input/Input.jsx";
import searchIcon from "../../assets/search-icon.svg";
import UserCard from "../../components/UserCard/UserCard.jsx";

const Users = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.header__title}>Пользователи</h2>
          <Input
            className={styles.header__input}
            type="text"
            placeholder="Поиск..."
            withIcon={true}
            imageSrc={searchIcon}
          />
        </div>
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
};

export default Users;
