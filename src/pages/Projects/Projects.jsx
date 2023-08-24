import React, { useState, useEffect } from "react";
import styles from "./Projects.module.sass";
import Input from "../../components/Input/Input";
import searchIcon from "../../assets/search-icon.svg";
import axios from "axios";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { useNavigate } from "react-router-dom";

const projectsAPI = `${import.meta.env.VITE_SERVER_URL}/api/projects/`;

const Projects = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get(projectsAPI).then((data) => {
      setProjects(data.data);
      setIsLoading(false);
    });
  }, []);

  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const filtered = projects.filter((project) => {
      return project.title.toLowerCase().includes(inputText.toLowerCase());
    });
    setFilteredProjects(filtered);
  }, [inputText, projects]);

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h2 className={styles.header__title}>Проекты</h2>
          <Input
            inputText={inputText}
            setInputText={setInputText}
            className={styles.header__input}
            type="text"
            placeholder="Поиск..."
            withIcon={true}
            imageSrc={searchIcon}
          />
        </header>
        <section className={styles.projects}>
          {isLoading ? (
            <CardSkeleton cards={8} />
          ) : (
            <>
              {filteredProjects.map((project) => {
                return (
                  <ProjectCard
                    key={project.project_id}
                    project={project}
                    onClick={() => {
                      navigate(`/project/${project.project_id}`);
                    }}
                  />
                );
              })}
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Projects;
