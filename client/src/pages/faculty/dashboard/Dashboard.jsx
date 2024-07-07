import React from 'react';
import ListProject from '../addProject/ListProject';
import StudentRequest from '../studentRequest/StudentRequest';
import './Dashboard.css';
import Sidebar from '../../../components/sidebar/sidebar';
<<<<<<< HEAD
import Profile from '../../../components/profile/profile';
=======
import { useAuth } from '../../../store/auth';
>>>>>>> 690ae492321f6a872cb15cc4ceb9f14f10e24d18

const Dashboard = () => {

  const {user} = useAuth();

  const options = [
    { name: 'List A Project', component: ListProject },
    { name: 'Student Request', component: StudentRequest },
    { name: 'Your Project(s)', component: () => <div>Your Project(s) Content</div> },
<<<<<<< HEAD
    { name: 'Profile', component: Profile }
=======
    { name: 'Profile', component: () => <div>` This is {user.firstname} {user.lastname}`</div> }
>>>>>>> 690ae492321f6a872cb15cc4ceb9f14f10e24d18
  ];

  return (
    <div className="dashboard">
      <Sidebar options={options} />
    </div>
  );
};

export default Dashboard;