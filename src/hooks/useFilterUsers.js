import React, { useEffect, useState } from "react";

const useFilterUsers = (inputText, users) => {

  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const filtered = users.filter((user) => {
      return user.name.toLowerCase().includes(inputText.toLowerCase());
    });
    setFilteredUsers(filtered);
  }, [inputText, users]);
  return {
    filteredUsers,
  };
};

export default useFilterUsers;
