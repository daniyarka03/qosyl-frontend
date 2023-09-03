import React, { useState } from 'react'
import styles from "./Jobs.module.sass";
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import useGetProjects from '../../hooks/useGetProjects';
import useFilterProjects from '../../hooks/useFilterProjects';
import searchIcon from "../../assets/search-icon.svg";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";


const Jobs = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const [isProjectLoading, setIsProjectLoading] = useState(true);
    const { projects } = useGetProjects(setIsProjectLoading);
    const { filteredProjects } = useFilterProjects(inputText, projects);
  
    return (
      <>
        <Navbar />
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h2 className={styles.header__title}>Вакансии</h2>
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
}

export default Jobs