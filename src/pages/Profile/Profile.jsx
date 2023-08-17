import React, { useState, useEffect } from "react";
import styles from "./Profile.module.sass";
import PostCard from "../../components/PostCard/PostCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard"
import axios from "axios";
const src =
  "https://raw.githubusercontent.com/daniyarorazov/sampleDataJson/main/projectsSampleData.json";
import Navbar from "../../components/Navbar/Navbar";
const Profile = () => {
  const [projects, setProjects] = useState([]);
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
        <div className={styles.profile__name}>Данияр</div>
      </div>
      <div className={styles.settings}>
        <button className={styles.settings__action}>Изменить</button>
        <button className={styles.settings__action}>Выйти</button>
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

export default Profile;
