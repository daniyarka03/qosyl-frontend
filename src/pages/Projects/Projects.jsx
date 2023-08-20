import React, { useState, useEffect } from "react";
import styles from "./Projects.module.sass";
import Input from "../../components/Input/Input";
import searchIcon from "../../assets/search-icon.svg";
import axios from "axios";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const projectsAPI = "http://127.0.0.1:8000/api/projects/";

const Projects = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get(projectsAPI).then((data) => {
      setProjects(data.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h2 className={styles.header__title}>Проекты</h2>
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
          {projects.map((project) => {
            return (
              <ProjectCard
                key={project.project_id}
                project={project}
                onClick={() => {
                  navigate(`/project/${project.project_id}}`, {
                    state: { project },
                  });
                }}
              />
            );
          })}
        </section>
      </div>
    </>
  );
};

export default Projects;
