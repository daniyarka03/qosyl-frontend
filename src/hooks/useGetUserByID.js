import { useState, useEffect } from "react";
import axios from "axios";
import { usersAPI } from "../constants/API";

const useGetUserByID = (userID, setIsUserLoading) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(usersAPI + userID)
      .then((data) => {
        setUser(data.data);
        setIsUserLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return { user };
};

export default useGetUserByID;
