import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from "../src/pages/Auth/SignIn"
import SignUp from "../src/pages/Auth/SignUp"
import styles from './App.module.sass'
import Projects from "../src/pages/Projects/Projects"
import ProjectInfo from './pages/ProjectInfo/ProjectInfo'
import CreateProject from './pages/CreateProject/CreateProject'
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import ResetPasswordConfirm from "./pages/Auth/ResetPasswordConfirm.jsx";
import {Provider} from "react-redux";
import store from "./store.js";
import Layout from "./hocs/Layout.jsx";
import Profile from './pages/Profile/Profile'
import Users from './pages/Users/Users'
import Notifications from './pages/Notifications/Notifications'
import EditProject from './pages/EditProject/EditProject'
import Search from "./pages/Search/Search"
import Posts from './pages/Posts/Posts'
import CreatePost from './pages/CreatePost/CreatePost'

const App = () => {
  return (
    <div className={styles.App}>
      <Provider store={store}>
      <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<SignIn/>}/>
              <Route path='/registration' element={<SignUp/>}/>

              
              <Route path='/reset-password' element={<ResetPassword/>}/>
              <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>
              <Route path='/project-info' element={<ProjectInfo/>}/>

              <Route path='/create-project' element={<CreateProject/> }/>
              <Route path='/edit-project' element={<EditProject/> }/>

              <Route path='/create-post' element={<CreatePost/>}/>

              <Route path='/search' element={<Search/>}/>
              <Route path="/search/projects" element={<Projects />} />
              <Route path='/search/users' element= {<Users/>} />
              <Route path='/posts' element={<Posts/>} />
              <Route path='/notifications' element= {<Notifications/>} />
              <Route path='/profile' element= {<Profile/>} />

            </Routes>
          </Layout>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App;
