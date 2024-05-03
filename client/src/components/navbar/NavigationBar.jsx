import React, { useState } from "react";
import "./NavigationBar.css";
import logo from "./image/logowhite.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

function NavigationBar() {
  const { isLoggedIn, user, LogoutUser} = useAuth();


  return (
    <div>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="nav-items">
          <ul>
            <li className="lists">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="lists">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="lists">
              <NavLink to="/projects">Project</NavLink>
            </li>
            <li className="lists">
              <NavLink to="/students-request">Request</NavLink>
            </li>
            <li className="lists">
              <NavLink to="/projects-list">Project List</NavLink>
            </li>

            { isLoggedIn ?
              <li className="lists">
                <NavLink to="/logout">Logout</NavLink>
              </li>
            : (
              <>
                <li className="lists">
                  <NavLink to="/register">Register</NavLink>
                </li>
                {/* <li className="lists">
                  <NavLink to="/login">Login</NavLink>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
