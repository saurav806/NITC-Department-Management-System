import React from "react";
import "./ManageProject.css";
import { NavLink, Routes, Route } from "react-router-dom";

const ManageProject = () => {
  return (
    <div className="management">
        <div className="menu-section">
          <ul className="list">
            <li className="active menu">Project Management</li>
            <li className="inactive menu">User Management</li>
            <li className="inactive menu">Resource Management</li>
          </ul>
        </div>
        <div className="body-section">
          <NavLink to="/projects-list" className="manage-box btn">
              Manage Projects
          </NavLink>
        </div>
    </div>
  );
};

export default ManageProject;
