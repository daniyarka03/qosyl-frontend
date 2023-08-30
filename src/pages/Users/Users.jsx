import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import styles from "./Users.module.sass";
import Input from "../../components/Input/Input.jsx";
import searchIcon from "../../assets/search-icon.svg";
import UserCard from "../../components/UserCard/UserCard.jsx";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton.jsx";
import useGetUsers from "../../hooks/useGetUsers.js";
import useGetCurrentUser from "../../hooks/useGetCurrentUser.js";
import useFilterUsers from "../../hooks/useFilterUsers.js";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useGetCurrentUser(setIsLoading);
  const { users } = useGetUsers(setIsLoading);
  const [inputText, setInputText] = useState("");
  const { filteredUsers } = useFilterUsers(inputText, users);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.header__title}>Пользователи</h2>
          <Input
            inputText={inputText}
            setInputText={setInputText}
            className={styles.header__input}
            type="text"
            placeholder="Поиск..."
            withIcon={true}
            imageSrc={searchIcon}
          />
        </div>
        {isLoading ? (
          <CardSkeleton cards={8} />
        ) : (
          <>
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                userId={user.user_id}
                name={user.name}
                currentUser={currentUser}
                avatar={user.avatar}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
