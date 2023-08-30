import React, { useEffect, useState } from "react";

const useFilterUsers = (inputText, projects) => {
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    const filtered = projects.filter((project) => {
      return project.title.toLowerCase().includes(inputText.toLowerCase());
    });
    setFilteredProjects(filtered);
  }, [inputText, projects]);
  return {
    filteredProjects,
  };
};

export default useFilterUsers;
