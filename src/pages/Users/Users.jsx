import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import styles from "./Users.module.sass";
import Input from "../../components/Input/Input.jsx";
import searchIcon from "../../assets/search-icon.svg";
import UserCard from "../../components/UserCard/UserCard.jsx";
import axios from "axios";

const usersAPI = "http://127.0.0.1:8000/api/users/";
const currentUserAPI = "http://127.0.0.1:8000/api/users/profile/";

const Users = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);

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
        {filteredUsers.map((user) => (
          <UserCard key={user.id} userId={user.user_id} name={user.name} currentUser={currentUser}/>
        ))}
      </div>
    </div>
  );
};

export default Users;
