import React from 'react';
import ListProject from '../addProject/ListProject';
import StudentRequest from '../studentRequest/StudentRequest';
import './Dashboard.css';
import Sidebar from '../../../components/sidebar/sidebar';
import Profile from '../../../components/profile/profile';
import { useAuth } from '../../../store/auth';
import ListedProject from '../listedProject/listedProject';
import WorkingProject from '../workingProject/workingProject';
const Dashboard = () => {

  const {user} = useAuth();

  const options = [
    { name: 'List A Project', component: ListProject },
    { name: 'Student Request', component: StudentRequest },
    { name: 'Listed Projects', component: ListedProject },
    { name: 'Working Projects', component: WorkingProject },
    { name: 'Profile', component: Profile }
  ];

  return (
    <div className="dashboard">
      <Sidebar options={options} />
    </div>
  );
};

export default Dashboard;