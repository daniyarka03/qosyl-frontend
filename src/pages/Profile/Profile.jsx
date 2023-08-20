import React, { useState, useEffect } from "react";
import styles from "./Profile.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/PostCard/PostCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions.js";

const userAPI = "http://127.0.0.1:8000/api/users/profile/";
const projectsAPI = "http://127.0.0.1:8000/api/projects/";

const Profile = () => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);

  const userInformation = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: { Authorization: `Bearer ${userInformation.token}` },
  };
  useEffect(() => {
    axios.get(userAPI, config).then((data) => {
      console.log(data.data);
      setUser(data.data);
    });
  }, []);

  useEffect(() => {
    axios.get(projectsAPI).then((data) => {
      setProjects(data.data);
    });
  }, []);

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, isAuthenticated } = userLogin;

  console.log(userLogin);
  console.log(userInfo);
  console.log(isAuthenticated);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    //localStorage.removeItem('userInfo');
    navigate("/");
    dispatch(logout());
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.profile}>
        <div className={styles.profile__avatar}></div>
        <div className={styles.profile__name}>{user.name}</div>
      </div>
      <div className={styles.settings}>
        <button
          className={styles.settings__action}
          onClick={() => navigate("/create-project")}
        >
          Добавить проект
        </button>
        <button className={styles.settings__action}>Изменить</button>
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
            <PostCard />
          </div>
        </div>
        <div className={styles.info__block}>
          <p className={styles.info__header}>Проекты</p>
          {projects.map((project) => {
            return (
              <ProjectCard
                key={project.project_id}
                project={project}
                onClick={() => {
                  navigate(`/my_project/${project.project_id}`, {
                    state: { project },
                  });
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
