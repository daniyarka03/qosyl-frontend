import React, { useEffect, useState } from "react";
import styles from "./UserPage.module.sass";
import PostCard from "../../components/PostCard/PostCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
const src =
  "https://raw.githubusercontent.com/daniyarorazov/sampleDataJson/main/projectsSampleData.json";

const UserPage = () => {
  const [projects, setProjects] = useState([]);
  const location = useLocation()
  useEffect(() => {
    axios.get(src).then((data) => {
      setProjects(data.data);
    });
  }, []);
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.profile}>
        <div className={styles.profile__avatar}></div>
        <div className={styles.profile__name}>{location.state.username}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.info__block}>
          <p className={styles.info__header}>Посты</p>
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
        <div className={styles.info__block}>
          <p className={styles.info__header}>Проекты</p>
          {projects.map((project) => {
            return <ProjectCard key={project.Id} project={project} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
