import React from 'react';
import './studentDashboard.css';
import Sidebar from '../../../components/sidebar/sidebar';
import ProjectList from '../projectList/ProjectList';
import AppliedProject from '../appliedProject/appliedProject';
import Profile from '../../../components/profile/profile';
import WorkingProject from '../workingProject/workingProject';
import AvailableHall from '../hallBooking/hallList';


const StudentDashboard = () => {
  const options = [
    { name: 'Available Project', component: ProjectList },
    { name: 'Applied Project', component: AppliedProject },
    { name: 'Working Project', component: WorkingProject },
    { name: 'Available Hall', component: AvailableHall},
    // { name: 'Hall Booking Request', component: HallBookingRequest },
    // { name: 'My Booking', component: MyBooking },
    { name: 'Profile', component: Profile }
  ];

  return (
    <div className="dashboard">
      <Sidebar options={options} />
    </div>
  );
};

export default StudentDashboard;
