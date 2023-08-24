import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/PostCard/PostCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import styles from "./Home.module.sass";
import axios from "axios";

const userAPI = "http://127.0.0.1:8000/api/users/profile/";
const postsAPI = "http://127.0.0.1:8000/api/posts/";
const projectsAPI = "http://127.0.0.1:8000/api/projects/";

const Home = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);

  const userInformation = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: { Authorization: `Bearer ${userInformation.token}` },
  };
  useEffect(() => {
    axios
      .get(userAPI, config)
      .then((data) => {
        setUser(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(postsAPI)
      .then((data) => {
        setPosts(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(projectsAPI)
      .then((data) => {
        setProjects(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const lastPosts = posts.slice(posts.length - 2);
  const lastProjects = projects.slice(projects.length - 2);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.header__title}>Привет, {user.name}</p>
        </div>
        <section className={styles.section}>
          <p className={styles.section__title}>Последние посты</p>
          <div className={styles.section__cards}>
            {lastPosts.map((post) => {
              return (
                <PostCard
                  key={post.post_id}
                  authorName={post.author_name}
                  content={post.content}
                />
              );
            })}
          </div>
        </section>
        <section className={styles.section}>
          <p className={styles.section__title}>Последние проекты</p>
          <div className={styles.section__cards}>
            {lastProjects.map((project) => {
              return <ProjectCard key={project.project_id} project={project} />;
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
