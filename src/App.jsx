import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../src/pages/Auth/SignIn";
import SignUp from "../src/pages/Auth/SignUp";
import styles from "./App.module.sass";
import Projects from "../src/pages/Projects/Projects";
import ProjectInfo from "./pages/ProjectInfo/ProjectInfo";
import CreateProject from "./pages/CreateProject/CreateProject";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import ResetPasswordConfirm from "./pages/Auth/ResetPasswordConfirm.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import Layout from "./hocs/Layout.jsx";
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
import { SkeletonTheme } from "react-loading-skeleton";
import PostComments from "./pages/PostComments/PostComments";
import CreateComment from "./pages/CreateComment/CreateComment";

const App = () => {
  return (
    <div className={styles.App}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/registration" element={<SignUp />} />
              <Route path="/home" element={<Home />} />

              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/password/reset/confirm/:uid/:token"
                element={<ResetPasswordConfirm />}
              />
              <Route path="/project/:id" element={<ProjectInfo />} />

              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/edit-project/:id" element={<EditProject />} />

              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/edit-post/:id" element={<EditPost />} />


              <Route path="/search" element={<Search />} />
              <Route path="/search/projects" element={<Projects />} />
              <Route path="/search/users" element={<Users />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/post/:id/comments" element={<PostComments />} />
              <Route path="/post/:id/create-comment" element={<CreateComment />}/>
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/user/:id" element={<UserPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
