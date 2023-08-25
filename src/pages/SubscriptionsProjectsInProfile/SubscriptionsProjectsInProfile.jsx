import React, {useEffect, useState} from 'react';
import styles from "../SubscriptionsProjectsInProfile/SubscriptionsProjectsInProfile.module.sass";
import Navbar from "../../components/Navbar/Navbar.jsx";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton.jsx";
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx";
import axios from "axios";
import {useCurrentUserData} from "../../actions/getCurrentUserData.js";
import {useNavigate} from "react-router-dom";

const SubscriptionsProjectsInProfile = () => {

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {userID} = useCurrentUserData();
    const projectsAPI = `${import.meta.env.VITE_SERVER_URL}/api/projects/`;
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(projectsAPI).then((data) => {
            setProjects(data.data);
            setIsLoading(false)
        });
    }, []);

    const subsProjects = projects.filter((project) => {
        return project.subscribers.includes(userID);
    });

    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.list_projects}>
                <h1 className={styles.title}>Подписки на проекты</h1>
                <section className={styles.projects}>
                    {isLoading ? (
                        <CardSkeleton cards={8} />
                    ) : (
                        <>
                            {subsProjects.map((project) => {
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
        </div>
    );
};

export default SubscriptionsProjectsInProfile;