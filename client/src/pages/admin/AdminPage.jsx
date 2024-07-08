import React from 'react';
import ListHall from './addHall/ListHall';
import Profile from '../../components/profile/profile';
import Sidebar from '../../components/sidebar/sidebar';
import { useAuth } from '../../store/auth';
const Dashboard = () => {

  const {user} = useAuth();

  const options = [
    { name: 'List A Project', component: ListHall },
    { name: 'Profile', component:  Profile}
  ];

  return (
    <div className="dashboard">
      <Sidebar options={options} />
    </div>
  );
};

export default Dashboard;







// import React from 'react';
// import "./AdminPage.css";
// import { NavLink } from 'react-router-dom';

// const AdminPage = () => {
//   return (
//     <div className='admin-panel'>
//         <NavLink to="/admin/manage-project" className="admin-box btn">
//             Project Management
//         </NavLink>
//         <NavLink to="/admin/manage-user" className="admin-box btn">
//             Manage User
//         </NavLink>
//         <NavLink to="/admin/manage-resource" className="admin-box btn">
//             Resource Management
//         </NavLink>
        
//     </div>
//   )
// }

// export default AdminPage;
