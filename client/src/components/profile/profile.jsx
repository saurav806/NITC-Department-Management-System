import React from 'react';
import './profile.css';
import { useAuth } from '../../store/auth';


const Profile = () => {

    const { user } = useAuth();
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
                    {user.rollno && <p><strong>Roll:</strong> {user.rollno}</p>}
                    {user.facID && <p><strong>ID:</strong> {user.facID}</p>}
                    {user.course && <p><strong>Course:</strong> {user.course}</p>}
                    {user.batch && <p><strong>Admission Year:</strong> {user.batch}</p>}
                    {user.department && <p><strong>Department:</strong> {user.department}</p>}
                    {user.email && <p><strong>Email ID:</strong> {user.email}</p>}
                    {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                    {user.office && <p><strong>Office:</strong> {user.office}</p>}
                </div>

            </div>
        </div>
    );
}

export default Profile;
