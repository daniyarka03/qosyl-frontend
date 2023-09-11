import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./hocs/Layout";
import SignIn from "../src/pages/Auth/SignIn";
import SignUp from "../src/pages/Auth/SignUp";
import Projects from "../src/pages/Projects/Projects";
import ProjectInfo from "./pages/ProjectInfo/ProjectInfo";
import CreateProject from "./pages/CreateProject/CreateProject";
import ResetPassword from "./pages/Auth/ResetPassword";
import ResetPasswordConfirm from "./pages/Auth/ResetPasswordConfirm";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import Notifications from "./pages/Notifications/Notifications";
import EditProject from "./pages/EditProject/EditProject";
import Search from "./pages/Search/Search";
import Posts from "./pages/Posts/Posts";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditPost from "./pages/EditPost/EditPost";
import UserPage from "./pages/UserPage/UserPage";
import Home from "./pages/Home/Home";
import EditProfile from "./pages/EditProfile/EditProfile";
import SubscriptionsProjectsInProfile from "./pages/SubscriptionsProjectsInProfile/SubscriptionsProjectsInProfile";
import useIsAuthenticated from "./hooks/useIsAuthenticated";
import styles from "./App.module.sass";
import PostComments from "./pages/PostComments/PostComments";
import CreateComment from "./pages/CreateComment/CreateComment";

import PageNotFound from './pages/404/PageNotFound';
import StudentsClub from "./pages/StudentsClub/StudentsClub.jsx";
import CreateStudentsClub from "./pages/CreateStudentsClub/CreateStudentsClub.jsx";
import EditStudentsClub from "./pages/EditStudentsClub/EditStudentsClub.jsx";
import SearchStudentsClubs from "./pages/SearchStudentsClubs/SearchStudentsClubs.jsx";
import Jobs from "./pages/Jobs/Jobs";
import CreateJob from "./pages/CreateJob/CreateJob";
import EditJob from "./pages/EditJob/EditJob";
import JobInfo from "./pages/JobInfo/JobInfo";


const App = () => {
  const isAuthenticated = useIsAuthenticated();

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(isAuthenticated);
  }, [isAuthenticated]);

  const [projectDeleted, setProjectDeleted] = useState(false);

  return (
    <div className={styles.App}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Routes>
              {auth ? (
                <>
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="/home" element={<Home />} />

                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route
                    path="/password/reset/confirm/:uid/:token"
                    element={<ResetPasswordConfirm />}
                  />
                  <Route
                    path="/project/:id"
                    element={
                      <ProjectInfo
                        projectDeleted={projectDeleted}
                        setProjectDeleted={setProjectDeleted}
                      />
                    }/>
                  <Route path="/create-project" element={<CreateProject />} />
                  <Route path="/edit-project/:id" element={<EditProject />} />

                  <Route path="/create-post" element={<CreatePost />} />
                  <Route path="/edit-post/:id" element={<EditPost />} />
                  <Route path="/students-club/:id" element={<StudentsClub />} />
                  <Route path="/create-students-club" element={<CreateStudentsClub />} />
                  <Route path="/edit-students-club/:id" element={<EditStudentsClub />} />
                  <Route path="/search/students-clubs" element={<SearchStudentsClubs />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/search/projects" element={<Projects />} />
                  <Route path="/search/users" element={<Users />} />
                  <Route path="/search/jobs" element={<Jobs />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route
                    path="/profile"
                    element={
                      <Profile
                        projectDeleted={projectDeleted}
                        setProjectDeleted={setProjectDeleted}
                      />
                    }
                  />
                  <Route path="/edit-profile" element={<EditProfile />} />

                  <Route path="/create-job" element={<CreateJob />} />
                  <Route path="/edit-job/:id" element={<EditJob />} />
                  <Route path="/job/:id" element={<JobInfo />} />
                  <Route
                    path="/subscriptions-projects"
                    element={<SubscriptionsProjectsInProfile />}
                  />
                  <Route path="/post/:id/comments" element={<PostComments />} />
                  <Route
                    path="/post/:id/create-comment"
                    element={<CreateComment />}
                  />
                  <Route path="/user/:id" element={<UserPage />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/registration" element={<Home />} />
                </>
              ) : (
                <>
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="/" element={<SignIn />} />
                  <Route path="/registration" element={<SignUp />} />
                </>
              )}
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </div>

  );
};

export default App;
