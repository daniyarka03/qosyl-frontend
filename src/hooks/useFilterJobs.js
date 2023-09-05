import React, { useEffect, useState } from "react";

const useFilterJobs = (inputText, jobs) => {

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      return job.title.toLowerCase().includes(inputText.toLowerCase());
    });
    setFilteredJobs(filtered);
  }, [inputText, jobs]);
  return {
    filteredJobs,
  };
};

export default useFilterJobs;
