import React, { useEffect, useState } from 'react';
// import './hallList.css';
import { useAuth } from '../../../store/auth';

const AvailableHall = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authorizationToken } = useAuth();

  const getAllAvailableHalls = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/view-available-hall", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-type": "application/json"
        },
      });
      const data = await response.json();
      console.log('User data fetched:', data);
      setHalls(data.hallList || []);
    } catch (error) {
      console.error("Error fetching project", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAvailableHalls();
  }, []);

  return (
    <div>
      <div className="heading">
        <h1>Available Hall</h1>
      </div>
      {loading ? (
        <div className="loading">
          <div className="loading-indicator"></div>
          {/* <p>Loading...</p> */}
        </div>
      ) : halls.length > 0 ? (
        <div className="project-table-data">
          <table className='project-table'>
            <thead>
              <tr>
                <th className='title'>Title</th>
                <th className='mentor'>Mentor</th>
                <th className='mentor'>Mentor Email</th>
                <th className='mentor'>Skills</th>
                <th className='details'>Applied on</th>
                <th className='description'>Status</th>
              </tr>
            </thead>
            {/* <tbody>
              {halls.map((curHall, index) => (
                <tr key={index}>
                  <td>{curProject.title}</td>
                  <td>{curProject.mentorName}</td>
                  <td>{curProject.mentorEmail}</td>
                  <td>{curProject.projectSkill}</td>
                  <td>{curProject.applyDate.split('T')[0]}</td>
                  <td>{curProject.appliedStatus}</td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      ) : (
        <div>
          <p>No Hall available at this time, try contacting the admin</p>
        </div>
      )}
    </div>
  );
};

export default AvailableHall;