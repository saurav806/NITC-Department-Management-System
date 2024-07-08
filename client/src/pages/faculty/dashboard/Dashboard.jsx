import React from 'react';
import ListProject from '../addProject/ListProject';
import StudentRequest from '../studentRequest/StudentRequest';
import './Dashboard.css';
import Sidebar from '../../../components/sidebar/sidebar';
import Profile from '../../../components/profile/profile';
import { useAuth } from '../../../store/auth';
import ListedProject from '../listedProject/listedProject';
import WorkingProject from '../workingProject/workingProject';
import ListedHall from '../../../components/listedHall/listedHall';
const Dashboard = () => {

  const {user} = useAuth();

  const options = [
    { name: 'List A Project', component: ListProject },
    { name: 'Student Request', component: StudentRequest },
    { name: 'My Listed Projects', component: ListedProject },
    { name: 'Working Projects', component: WorkingProject },
    { name: 'Available Hall', component: ListedHall },
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

export default Dashboard;