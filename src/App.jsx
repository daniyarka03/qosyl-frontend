import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from "../src/pages/Auth/SignIn"
import SignUp from "../src/pages/Auth/SignUp"
import styles from './App.module.sass'
import Projects from "../src/pages/Projects/Projects"

const App = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/registration' element={<SignUp/>}/>
          <Route path='/projects' element={<Projects/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
