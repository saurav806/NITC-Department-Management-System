import React from 'react';
import ListProject from '../addProject/ListProject';
import StudentRequest from '../studentRequest/StudentRequest';
import './Dashboard.css';
import Sidebar from '../../../components/sidebar/sidebar';

const Dashboard = () => {
  const options = [
    { name: 'List A Project', component: ListProject },
    { name: 'Student Request', component: StudentRequest },
    { name: 'Your Project(s)', component: () => <div>Your Project(s) Content</div> },
    { name: 'Profile', component: () => <div>Profile Content</div> }
  ];

  return (
    <div className="dashboard">
      <Sidebar options={options} />
    </div>
  );
};

export default Dashboard;