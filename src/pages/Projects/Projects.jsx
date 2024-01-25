import React, { useState, useEffect } from "react";
import styles from "./Projects.module.sass";
import Input from "../../components/Input/Input";
import searchIcon from "../../assets/search-icon.svg";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Navbar from "../../components/Navbar/Navbar";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { useNavigate } from "react-router-dom";
import useGetProjects from "../../hooks/useGetProjects";
import useFilter from "../../hooks/useFilter";
const Projects = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const { projects } = useGetProjects(setIsProjectLoading);
  const { filteredProjects } = useFilter(inputText, projects);

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
          {isProjectLoading ? (
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
