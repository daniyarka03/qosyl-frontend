import React, { useEffect, useState } from "react";

const useFilter = (inputText, data) => {

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data.filter((obj) => {
      return obj.title.toLowerCase().includes(inputText.toLowerCase());
    });
    setFilteredData(filtered);
  }, [inputText, data]);
  return {
    filteredProjects: filteredData,
    filteredJobs: filteredData,
  };
};

export default useFilter;
