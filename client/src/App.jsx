import React from "react";
import './App.css';
import NavigationBar from './components/navbar/NavigationBar';
import Homepage from './pages/homepage/Homepage';
import Dashboard from './pages/faculty/dashboard/Dashboard';
import ListProject from './pages/faculty/addProject/ListProject';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import ErrorPage from "./pages/errorPage/ErrorPage";
import FacRegister from "./pages/register/FacRegister";
import FacultyLogin from "./pages/login/FacultyLogin";
import { Logout } from "./pages/logout/Logout";
import StudentRequest from "./pages/faculty/studentRequest/StudentRequest";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProjectList from "./pages/student/projectList/ProjectList";


function App() {

  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ListProject />} />
          <Route path="/students-request" element={<StudentRequest />} />
          <Route path="/projects-list" element={<ProjectList />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/facultyregister" element={<FacRegister />} /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/facultylogin" element={<FacultyLogin />} /> */}
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
