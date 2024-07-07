import React from 'react';
import ListProject from '../addProject/ListProject';
import StudentRequest from '../studentRequest/StudentRequest';
import './Dashboard.css';
import Sidebar from '../../../components/sidebar/sidebar';
import { useAuth } from '../../../store/auth';

const Dashboard = () => {

  const {user} = useAuth();

  const options = [
    { name: 'List A Project', component: ListProject },
    { name: 'Student Request', component: StudentRequest },
    { name: 'Your Project(s)', component: () => <div>Your Project(s) Content</div> },
    { name: 'Profile', component: () => <div>` This is {user.firstname} {user.lastname}`</div> }
  ];

  return (
    <div className="dashboard">
      <Sidebar options={options} />
    </div>
  );
};

export default Dashboard;