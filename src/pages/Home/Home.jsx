import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/PostCard/PostCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import styles from "./Home.module.sass";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useGetProjects from "../../hooks/useGetProjects";
import useGetPosts from "../../hooks/useGetPosts";

const Home = () => {
  const [avatars, setAvatars] = useState({});
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const navigate = useNavigate();

  const { currentUser } = useGetCurrentUser(setIsUserLoading);
  const { posts } = useGetPosts(setIsPostLoading);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const avatarsData = {};
        for (const post of posts) {
          const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/${
            post.author_id
          }`;
          console.log(userAPI)  
          const userResponse = await axios.get(userAPI);
          avatarsData[post.author_id] = userResponse.data.avatar;
        }
        setAvatars(avatarsData);
        setIsAvatarLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  const { projects } = useGetProjects(setIsProjectLoading);

  const lastPosts = posts.slice(posts.length - 2);
  const lastProjects = projects.slice(projects.length - 2);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          {isUserLoading ? (
            <CardSkeleton cards={1} width={200} />
          ) : (
            <>
              <p className={styles.header__title}>Привет, {currentUser.name}</p>
              <img
                className={styles.header__avatar}
                src={`${import.meta.env.VITE_SERVER_URL_MEDIA}${currentUser.avatar}`}
              />
            </>
          )}
        </div>
        <section className={styles.section}>
          <p className={styles.section__title}>Последние посты</p>
          <div className={styles.section__cards}>
            {isPostLoading ? (
              <CardSkeleton cards={2} />
            ) : (
              <>
                {lastPosts.map((post) => {
                  return (
                    <PostCard
                      key={post.post_id}
                      avatar={avatars[post.author_id]}
                      post={post}
                    />
                  );
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
                {lastProjects.map((project) => {
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
