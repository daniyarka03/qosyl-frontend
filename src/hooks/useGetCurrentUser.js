import { useState, useEffect } from "react";
import axios from "axios";
import { userAPI } from "../constants/API";

const useGetCurrentUser = (setIsUserLoading) => {
  const userInformation = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: { Authorization: `Bearer ${userInformation.token}` },
  };
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    axios.get(userAPI, config).then((data) => {
      setCurrentUser(data.data);
      setIsUserLoading(false);
    });
  }, []);
  return { currentUser };
};

export default useGetCurrentUser;
