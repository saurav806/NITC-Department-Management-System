import React from 'react';
import './profile.css';
import { useAuth } from '../../store/auth';


const Profile = () => {

    const {user} = useAuth();
    if (!user) {
        return <div>Loading...</div>;
      }
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{user.firstname} {user.lastname}</h1>
      </div>
      <div className="profile-details">
        <div className="profile-info">
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Email ID:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
        
      </div>
    </div>
  );
}

export default Profile;
