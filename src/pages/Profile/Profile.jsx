import React, { useEffect, useState } from "react";
import styles from "./Profile.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions.js";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useGetProjects from "../../hooks/useGetProjects";
import useGetPosts from "../../hooks/useGetPosts";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings";
import ProfileTabs from "../../components/ProfileTabs/ProfileTabs";

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

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <ProfileHeader isUserLoading={isUserLoading} currentUser={currentUser} />
      <ProfileSettings logoutHandler={logoutHandler} navigate={navigate} />
      <ProfileTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isPostLoading={isPostLoading}
        posts={posts}
        isProjectLoading={isProjectLoading}
        projects={projects}
        currentUser={currentUser}
        handleDeletePost={handleDeletePost}
        navigate={navigate}
      />
    </div>
  );
};

export default Profile;
