import React, { useEffect, useState } from 'react';
import './StudentRequest.css';
import {useAuth}  from '../../../store/auth';


const StudentRequest = () => {

  
  const [projects, setProjects] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllAppliedProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/view-applied-project", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-type": "application/json"
        },
      });
      const data = await response.json();
      console.log('User data fetched:', data);

      const request = data.projectList.filter(project => project.appliedStatus === "Applied");

      setProjects(request || [] );
    } catch (error) {
      console.error("Error fetching project", error);
    }
  }

  useEffect(() => {
    getAllAppliedProjects();
  }, []);

  return (
    <div>
      <div className="heading">
        <h1>Students Request</h1>
      </div>
          {/* <thead >
            <tr>
              <th>Project Title</th>
              <th>Student Name</th>
              <th className='preference'>Preference</th>
              <th className='action'>Action</th>
            </tr>
          </thead>
           */}

      {projects.length > 0 ? (
      <div className="project-table-data">
        <table className='project-table'>
          <thead>
            <tr>
              <th className='title'>Title</th>
              <th className='mentor'>Student Name</th>
              <th className='mentor'>Student Email</th>
              <th className='details'>Preference</th>
              <th className='details'>Status</th>
              <th className='description'>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((curProject, index) => {
              return (
                <tr key={index}>
                  <td>{curProject.title}</td>
                  <td>{curProject.studentName}</td>
                  <td>{curProject.studentEmail}</td>
                  <td>{curProject.preference}</td>
                  <td>{curProject.appliedStatus}</td>
                  <td>
                    <button className="btn-action btn-accept">
                      Accept 
                    </button>
                    <button className="btn-action btn-reject">
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      ) : (
        <tr>
          <td colSpan="7">There is no any Request</td>
        </tr>
      )}






    </div>
  )
}

export default StudentRequest
