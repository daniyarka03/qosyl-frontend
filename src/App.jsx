import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from "../src/pages/SignIn"
import SignUp from "../src/pages/SignUp"
import styles from './App.module.sass'

const App = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/registration' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
