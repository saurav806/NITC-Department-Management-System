import React from 'react';
import './studentDashboard.css';
import Sidebar from '../../../components/sidebar/sidebar';
import ProjectList from '../projectList/ProjectList';
import AppliedProject from '../appliedProject/appliedProject';
import Profile from '../../../components/profile/profile';


const StudentDashboard = () => {
  const options = [
    { name: 'Available Project', component: ProjectList },
    { name: 'Applied Project', component: AppliedProject },
    { name: 'Your Project(s)', component: () => <div>Your Project(s) Content</div> },
    { name: 'Profile', component: Profile }
  ];

  return (
    <div className="dashboard">
      <Sidebar options={options} />
    </div>
  );
};

export default StudentDashboard;
