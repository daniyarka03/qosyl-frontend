import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from "../src/pages/Auth/SignIn"
import SignUp from "../src/pages/Auth/SignUp"
import styles from './App.module.sass'
import Projects from "../src/pages/Projects/Projects"
import ProjectInfo from './pages/ProjectInfo/ProjectInfo'
import CreateProject from './pages/CreateProject/CreateProject'
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import ResetPasswordConfirm from "./pages/Auth/ResetPasswordConfirm.jsx";
import {connect, Provider} from "react-redux";
import store from "./store.js";
import Layout from "./hocs/Layout.jsx";
import Profile from './pages/Profile/Profile'
import Users from './pages/Users/Users'
const App = ({isAuthenticated}) => {
  return (
    <div className={styles.App}>
      <Provider store={store}>
      <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<SignIn/>}/>
              <Route path='/registration' element={<SignUp/>}/>
                <Route path="/projects" element={isAuthenticated ? <Projects /> : <SignIn />} />
              <Route path='/reset-password' element={<ResetPassword/>}/>
              <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>
              <Route path='/project-info' element={isAuthenticated ? <ProjectInfo/> : <SignIn />}/>
              <Route path='/create-project' element={isAuthenticated ? <CreateProject/> : <SignIn />}/>
              <Route path='/profile' element= {<Profile/>} />
              <Route path='/users' element= {<Users/>} />
            </Routes>
          </Layout>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App;
