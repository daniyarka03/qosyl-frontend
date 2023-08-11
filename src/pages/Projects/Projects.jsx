import React, { useState, useEffect } from "react";
import styles from "./Projects.module.sass";
import Input from "../../components/Input/Input";
import searchIcon from "../../assets/search-icon.svg";
import axios from "axios";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";
const src ="https://raw.githubusercontent.com/daniyarorazov/sampleDataJson/main/projectsSampleData.json";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get(src)
      .then((data) => {
        setProjects(data.data)
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.header__title}>Projects</h2>
        <Input
          className={styles.header__input}
          type="text"
          placeholder="Поиск..."
          withIcon={true}
          imageSrc={searchIcon}
        />
      </header>
      <Carousel />
      <section className={styles.projects}>
        {projects.map(project => {
          return <ProjectCard key={project.Id} project={project}/>
        })}
      </section>
    </div>
    </>
    
  );
};

export default Projects;
