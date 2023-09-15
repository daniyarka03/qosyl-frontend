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
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import uuid from "react-uuid";

const UserPage = () => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isProjectLoading, setIsProjectLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState(0);

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

            <div className={styles.profile__info}>
              <p className={styles.profile__text}>
                Имя пользователя: {user.name}
              </p>
              <p className={styles.profile__text}>
                Специальность: {user.speciality}
              </p>
              <p className={styles.profile__text}>
                Место учебы: {user.study_place}
              </p>
            </div>
            <div className={styles.profile__hobbies}>
              
            <div className={styles.profile__hobbies__list}>
              {JSON.parse(user.hobbies).map((hobby) => (
                <p key={uuid()} className={styles.profile__hobbies__item}>{hobby.value}</p>
              ))}
            </div>
          </div>
          </>
        )}
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
          </TabPanel>
          <TabPanel>
            <div className={styles.project__wrapper}>
              {isProjectLoading && <CardSkeleton cards={8} />}
              {currentUserProjects.map((project) => {
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

export default UserPage;
