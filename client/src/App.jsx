import React from "react";
import './App.css';
import NavigationBar from './components/navbar/NavigationBar';
import Homepage from './pages/homepage/Homepage';
import HomeLander from "./pages/homepage/HomeLander";
import Dashboard from './pages/faculty/dashboard/Dashboard';
import ListProject from './pages/faculty/addProject/ListProject';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import ErrorPage from "./pages/errorPage/ErrorPage";
import { Logout } from "./pages/logout/Logout";
import StudentRequest from "./pages/faculty/studentRequest/StudentRequest";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,  // Import Navigate
} from "react-router-dom";
import ProjectList from "./pages/student/projectList/ProjectList";
import ManageUser from "./pages/admin/manageUser/ManageUser";
import ManageResource from "./pages/admin/manageResource/ManageResource";
import ManageBooking from "./pages/admin/manageBooking/ManageBooking";
import ManageProject from "./pages/admin/manageProject/ManageProject";
import AdminPage from "./pages/admin/AdminPage";

import { useAuth } from "./store/auth";
import FacultyRegister from "./pages/facultyRegister/facultyregister";


function App() {

  const { isLoggedIn } = useAuth(); // Corrected destructuring

  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomeLander />} />
          <Route path="/register" element={<Register />} /> {/* Moved outside of isLoggedIn check */}
          <Route path="/faculty-register" element={<FacultyRegister />} /> {/* Moved outside of isLoggedIn check */}
          <Route path="/login" element={<Login />} /> {/* Moved outside of isLoggedIn check */}
          
          {isLoggedIn ? (  // Use ternary operator to conditionally render routes
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<ListProject />} />
              <Route path="/students-request" element={<StudentRequest />} />
              <Route path="/projects-list" element={<ProjectList />} />
              <Route path="/logout" element={<Logout />} />

              {/* Admin routes */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/manage-booking" element={<ManageBooking />} />
              <Route path="/admin/manage-project" element={<ManageProject />} />
              <Route path="/admin/manage-resource" element={<ManageResource />} />
              <Route path="/admin/manage-user" element={<ManageUser />} />
              
              <Route path="*" element={<ErrorPage />} />
            </>
          ) : (
            <>
              {/* Redirect all other paths to login if not logged in */}
              <Route path="/dashboard" element={<Navigate to="/login" />} />
              <Route path="/projects" element={<Navigate to="/login" />} />
              <Route path="/students-request" element={<Navigate to="/login" />} />
              <Route path="/projects-list" element={<Navigate to="/login" />} />
              <Route path="/logout" element={<Navigate to="/login" />} />

              {/* Admin routes */}
              <Route path="/admin" element={<Navigate to="/login" />} />
              <Route path="/admin/manage-booking" element={<Navigate to="/login" />} />
              <Route path="/admin/manage-project" element={<Navigate to="/login" />} />
              <Route path="/admin/manage-resource" element={<Navigate to="/login" />} />
              <Route path="/admin/manage-user" element={<Navigate to="/login" />} />

              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  )
}

export default App
