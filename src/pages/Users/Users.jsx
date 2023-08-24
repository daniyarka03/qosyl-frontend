import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import styles from "./Users.module.sass";
import Input from "../../components/Input/Input.jsx";
import searchIcon from "../../assets/search-icon.svg";
import UserCard from "../../components/UserCard/UserCard.jsx";
import axios from "axios";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton.jsx";

const usersAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/`;
const currentUserAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/`;

const Users = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userInformation = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: { Authorization: `Bearer ${userInformation.token}` },
  };
  useEffect(() => {
    axios.get(currentUserAPI, config).then((data) => {
      setCurrentUser(data.data);
    });
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(usersAPI);
        setUsers(response.data);
        setIsLoading(false);
      } catch {
        console.error("Error fetching users:", users);
      }
    };
    getUsers();
  }, []);

  const [inputText, setInputText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const filtered = users.filter((user) => {
      return user.name.toLowerCase().includes(inputText.toLowerCase());
    });
    setFilteredUsers(filtered);
    
  }, [inputText, users]);

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
