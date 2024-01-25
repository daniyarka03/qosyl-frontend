import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/PostCard/PostCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import styles from "./Home.module.sass";
import { useNavigate } from "react-router-dom";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useGetProjects from "../../hooks/useGetProjects";
import useGetPosts from "../../hooks/useGetPosts";
import AvatarSkeleton from "../../components/AvatarSkeleton/AvatarSkeleton";

const Home = () => {
  const navigate = useNavigate();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isProjectLoading, setIsProjectLoading] = useState(true);

  const { currentUser } = useGetCurrentUser(setIsUserLoading);
  const { posts } = useGetPosts(setIsPostLoading);
  const { projects } = useGetProjects(setIsProjectLoading);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
      
            <>
              <p className={styles.header__title}>Привет, {currentUser.name}</p>
              {isUserLoading ? <AvatarSkeleton /> : <img
                className={styles.header__avatar}
                src={`${import.meta.env.VITE_SERVER_URL_MEDIA}${
                  currentUser.avatar
                }`}
              />}
            </>
        </div>
        <section className={styles.section}>
          <p className={styles.section__title}>Последние посты</p>
          <div className={styles.section__cards}>
            {isPostLoading ? (
              <CardSkeleton cards={2} />
            ) : (
              <>
                {posts.slice(posts.length - 2).map((post) => {
                  return <PostCard key={post.post_id} post={post} />;
                })}
              </>
            )}
          </div>
        </section>
        <section className={styles.section}>
          <p className={styles.section__title}>Последние проекты</p>
          <div className={styles.section__cards}>
            {isProjectLoading ? (
              <CardSkeleton cards={2} />
            ) : (
              <>
                {projects.slice(projects.length - 2).map((project) => {
                  return (
                    <ProjectCard
                      onClick={() => navigate(`/project/${project.project_id}`)}
                      key={project.project_id}
                      project={project}
                    />
                  );
                })}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
