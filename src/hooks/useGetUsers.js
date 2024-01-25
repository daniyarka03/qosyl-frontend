import { useState, useEffect } from "react";
import axios from "axios";
import { usersAPI } from "../constants/API";

const useGetUsers = (setIsLoading) => {
  const [users, setUsers] = useState([]);
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
  return { users };
};

export default useGetUsers;
