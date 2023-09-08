import React, { useEffect, useState } from "react";
import styles from "./Profile.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/PostCard/PostCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions.js";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useGetProjects from "../../hooks/useGetProjects";
import useGetPosts from "../../hooks/useGetPosts";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Profile = ({ projectDeleted, setProjectDeleted }) => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(true);

  const { currentUser } = useGetCurrentUser(setIsUserLoading);
  const { projects } = useGetProjects(setIsProjectLoading);
  const { posts, setPosts } = useGetPosts(setIsPostLoading);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleDeletePost = (deletedPostID) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.post_id !== deletedPostID)
    );
  };

  useEffect(() => {
    if (projectDeleted) {
      setProjectDeleted(false); // Сбрасываем флаг удаления проекта
    }
  }, [projectDeleted]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    //localStorage.removeItem('userInfo');
    window.location.replace("/");
    dispatch(logout());
  };

  const usersPosts = posts.filter((post) => {
    return post.author_id === currentUser.user_id;
  });

  const usersProjects = projects.filter((project) => {
    return project.author_id === currentUser.user_id;
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
              src={`${import.meta.env.VITE_SERVER_URL_MEDIA}${
                currentUser.avatar
              }`}
            />
            <div className={styles.profile__name}>{currentUser.name}</div>
          </>
        )}
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
          onClick={() => navigate("/create-job")}
        >
          Добавить вакансию
        </button>
        <button
          className={styles.settings__action}
          onClick={() => navigate("/edit-profile")}
        >
          Изменить
        </button>

        <button
          className={styles.settings__action}
          onClick={() => navigate("/subscriptions-projects")}
        >
          Подписки на проекты
        </button>
        <button
          className={styles.settings__action}
          onClick={() => logoutHandler()}
        >
          Выйти
        </button>
      </div>
      <div className={styles.info}>
        <Tabs
          selectedIndex={selectedTab}
          onSelect={(index) => setSelectedTab(index)}
        >
          <TabList className={styles.info__headers}>
            <Tab
              className={`${styles.info__header} ${
                selectedTab === 0 ? styles.selectedTab : ""
              }`}
            >
              Посты
            </Tab>
            <Tab
              className={`${styles.info__header} ${
                selectedTab === 1 ? styles.selectedTab : ""
              }`}
            >
              Проекты
            </Tab>
          </TabList>
          <TabPanel>
            <div className={styles.post__wrapper}>
              {isPostLoading && <CardSkeleton cards={8} />}
              {usersPosts.map((post) => {
                return (
                  <PostCard
                    key={post.post_id}
                    post={post}
                    isUserPost={currentUser.user_id === post.author_id}
                    onDelete={handleDeletePost}
                  />
                );
              })}
            </div>
          </TabPanel>
          <TabPanel>
            <div className={styles.project__wrapper}>
              {isProjectLoading && <CardSkeleton cards={8} />}
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
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
