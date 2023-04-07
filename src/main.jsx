import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App'
import './index.css'
import AddJobView from "./views/AddJobView";
import AddProjectView from "./views/AddProjectView";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" element={<App />} exact />
            <Route path="/create-job" element={<AddJobView />} exact />
            <Route path="/create-project" element={<AddProjectView />} exact />
        </Routes>
    </Router>
  </React.StrictMode>,
)
