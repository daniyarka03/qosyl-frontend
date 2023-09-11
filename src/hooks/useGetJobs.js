import { useState, useEffect } from "react";
import axios from "axios";
import { jobsAPI } from "../constants/API";

const useGetPosts = (setIsJobLoading) => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios.get(jobsAPI).then((data) => {
        setJobs(data.data);
        setIsJobLoading(false);
    });
  }, []);
  return { jobs, setJobs };
};

export default useGetPosts;
