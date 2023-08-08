import styles from "./App.module.sass";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from "../src/pages/SignIn";
import SignUp from "../src/pages/SignUp";
import Button from "./components/Button/Button";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/registration' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
