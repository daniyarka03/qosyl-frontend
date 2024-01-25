import { useState, useEffect } from "react";
import axios from "axios";
import { projectsAPI } from "../constants/API";

const useGetProjects = (setIsProjectLoading) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get(projectsAPI).then((data) => {
      setProjects(data.data);
      setIsProjectLoading(false)
    });
  }, []);
  return { projects, setProjects };
};

export default useGetProjects;
