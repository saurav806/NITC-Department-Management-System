import React from 'react';
import "./AdminPage.css";
import { NavLink } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className='admin-panel'>
        <NavLink to="/admin/manage-project" className="admin-box btn">
            Project Management
        </NavLink>
        <NavLink to="/admin/manage-user" className="admin-box btn">
            Manage User
        </NavLink>
        <NavLink to="/admin/manage-resource" className="admin-box btn">
            Resource Management
        </NavLink>
        
    </div>
  )
}

export default AdminPage;
