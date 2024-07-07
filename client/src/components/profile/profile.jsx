import React from 'react';
import './profile.css';

const Profile = () => {
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "987-654-3210",
    address: "4321 Elm St, Hometown, USA",
    bio: "A passionate developer and tech enthusiast."
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{user.name}</h1>
      </div>
      <div className="profile-details">
        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
        <div className="profile-bio">
          <p><strong>Bio:</strong> {user.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
