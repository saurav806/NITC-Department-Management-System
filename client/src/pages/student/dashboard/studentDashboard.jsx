import React from 'react';
import './studentDashboard.css';
import Sidebar from '../../../components/sidebar/sidebar';
import ProjectList from '../projectList/ProjectList';
import AppliedProject from '../appliedProject/appliedProject';
import Profile from '../../../components/profile/profile';
import WorkingProject from '../workingProject/workingProject';
import ListedHall from '../../../components/listedHall/listedHall';


const StudentDashboard = () => {
  const options = [
    { name: 'Available Project', component: ProjectList },
    { name: 'Applied Project', component: AppliedProject },
    { name: 'Working Project', component: WorkingProject },
    { name: 'Available Hall', component: ListedHall},
    // { name: 'My Booking Request', component: BookingHistory },
    // { name: 'My Booking History', component: BookingHistory },
    { name: 'Profile', component: Profile }
  ];

  return (
    <div className="dashboard">
      <Sidebar options={options} />
    </div>
  );
};

export default StudentDashboard;
