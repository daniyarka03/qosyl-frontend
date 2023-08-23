import React, { useState, useEffect } from "react";
import styles from "./Profile.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/PostCard/PostCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions.js";
import Avatar from "../../components/Avatar/Avatar";
// import Avatar from "react-avatar-edit";

const userAPI = "http://127.0.0.1:8000/api/users/profile/";
const projectsAPI = "http://127.0.0.1:8000/api/projects/";
const postsAPI = "http://127.0.0.1:8000/api/posts/";

const Profile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);

  const userInformation = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: { Authorization: `Bearer ${userInformation.token}` },
  };
  useEffect(() => {
    axios.get(userAPI, config).then((data) => {
      setUser(data.data);
    });
  }, []);

  useEffect(() => {
    axios.get(projectsAPI).then((data) => {
      setProjects(data.data);
    });
  }, []);

  useEffect(() => {
    axios.get(postsAPI).then((data) => {
      setPosts(data.data);
    });
  }, []);

  const handleDeletePost = (deletedPostID) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.post_id !== deletedPostID)
    );
  };

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, isAuthenticated } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    //localStorage.removeItem('userInfo');
    navigate("/");
    dispatch(logout());
  };

  const usersPosts = posts.filter((post) => {
    return post.author_id === user.user_id;
  });

  const usersProjects = projects.filter((project) => {
    return project.author_id === user.user_id;
  });

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={styles.profile}>
        <Avatar />
        <div className={styles.profile__name}>{user.name}</div>
      </div>
      <div className={styles.settings}>
        <button
          className={styles.settings__action}
          onClick={() => navigate("/create-project")}
        >
          Добавить проект
        </button>
        <button
          className={styles.settings__action}
          onClick={() => navigate("/edit-profile")}
        >
          Изменить
        </button>
        <button
          className={styles.settings__action}
          onClick={(e) => logoutHandler()}
        >
          Выйти
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.info__block}>
          <p className={styles.info__header}>Посты</p>
          <div className={styles.post__wrapper}>
            {usersPosts.map((post) => {
              return (
                <PostCard
                  key={post.post_id}
                  authorName={post.author_name}
                  content={post.content}
                  postID={post.post_id}
                  isUserPost={user.user_id === post.author_id}
                  onDelete={handleDeletePost}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.info__block}>
          <p className={styles.info__header}>Проекты</p>
          <div className={styles.project__wrapper}>
            {usersProjects.map((project) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
