import React, { useState } from "react";
import styles from "./UserPage.module.sass";
import PostCard from "../../components/PostCard/PostCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import useGetProjects from "../../hooks/useGetProjects";
import useGetPosts from "../../hooks/useGetPosts";
import useGetUserByID from "../../hooks/useGetUserByID";

const UserPage = () => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isProjectLoading, setIsProjectLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.pathname.split("/").pop();

  const { user } = useGetUserByID(userID, setIsUserLoading);
  const { projects } = useGetProjects(setIsProjectLoading);
  const { posts } = useGetPosts(setIsPostLoading);

  const currentUserProjects = projects.filter((project) => {
    return project.author_id === user.user_id;
  });
  const currentUserPosts = posts.filter((post) => {
    return post.author_id === user.user_id;
  });

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.profile}>
        {isUserLoading ? (
          <CardSkeleton cards={1} />
        ) : (
          <>
            <img
              className={styles.profile__avatar}
              src={`${import.meta.env.VITE_SERVER_URL_MEDIA}${user.avatar}`}
            />
            <div className={styles.profile__name}>{user.name}</div>
          </>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.info__block}>
          <p className={styles.info__header}>Посты</p>
          {isPostLoading && <CardSkeleton cards={8} />}
          {currentUserPosts.map((post) => {
            return (
              <PostCard
                key={post.post_id}
                content={post.content}
                authorName={post.author_name}
                avatar={user.avatar}
                id={post.post_id}
                post={post}
              />
            );
          })}
        </div>
        <div className={styles.info__block}>
          <p className={styles.info__header}>Проекты</p>
          {isProjectLoading && <CardSkeleton cards={8} />}
          {currentUserProjects.map((project) => {
            return (
              <ProjectCard
                key={project.project_id}
                project={project}
                onClick={() => navigate(`/project/${project.project_id}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
