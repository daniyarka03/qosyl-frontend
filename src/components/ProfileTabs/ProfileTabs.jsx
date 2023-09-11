import React from "react";
import styles from "./ProfileTabs.module.sass";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import PostCard from "../PostCard/PostCard";
import ProjectCard from "../ProjectCard/ProjectCard";
const ProfileTabs = ({
  selectedTab,
  setSelectedTab,
  isPostLoading,
  posts,
  isProjectLoading,
  projects,
  currentUser,
  handleDeletePost,
                       navigate
}) => {

  return (
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
            {posts
              .filter((post) => post.author_id === currentUser.user_id)
              .map((post) => {
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
            {projects
              .filter((project) => project.author_id === currentUser.user_id)
              .map((project) => {
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
  );
};

export default ProfileTabs;
