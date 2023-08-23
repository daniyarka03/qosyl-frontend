import React, { useEffect, useState } from "react";
import styles from "./UserPage.module.sass";
import PostCard from "../../components/PostCard/PostCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const usersAPI = "http://127.0.0.1:8000/api/users/";
const projectsAPI = "http://127.0.0.1:8000/api/projects/";
const postsAPI = "http://127.0.0.1:8000/api/posts/";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const userID = location.pathname.split("/").pop();

  useEffect(() => {
    axios
      .get(usersAPI)
      .then((data) => {
        const currentUser = data.data.filter((user) => user.user_id === userID);
        setUser(currentUser[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get(projectsAPI).then((data) => {
      setProjects(data.data);
    });
  }, []);

  const currentUserProjects = projects.filter((project) => {
    return project.author_id === user.user_id;
  });

  useEffect(() => {
    axios.get(postsAPI).then((data) => {
      setPosts(data.data);
    });
  }, []);

  const currentUserPosts = posts.filter((post) => {
    return post.author_id === user.user_id;
  });

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.profile}>
        <div className={styles.profile__avatar}></div>
        <div className={styles.profile__name}>{user.name}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.info__block}>
          <p className={styles.info__header}>Посты</p>
          {currentUserPosts.map((post) => {
            return <PostCard key={post.post_id} content={post.content} authorName={post.author_name}/>;
          })}
        </div>
        <div className={styles.info__block}>
          <p className={styles.info__header}>Проекты</p>
          {currentUserProjects.map((project) => {
            return <ProjectCard key={project.project_id} project={project} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
