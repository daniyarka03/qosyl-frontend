import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from "../src/pages/Auth/SignIn"
import SignUp from "../src/pages/Auth/SignUp"
import styles from './App.module.sass'
import Projects from "../src/pages/Projects/Projects"
import ProjectInfo from './pages/ProjectInfo/ProjectInfo'
import CreateProject from './pages/CreateProject/CreateProject'

const App = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/registration' element={<SignUp/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/project-info' element={<ProjectInfo/>}/>
          <Route path='/create-project' element={<CreateProject/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
