import React, { useEffect, useState } from 'react';
import './ProjectList.css';
import { useAuth } from '../../../store/auth';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-type": "application/json"
        },
      });
      const data = await response.json();
      console.log('User data fetched:', data);
      setProjects(data.projectList);
    } catch (error) {
      console.error("Error fetching project", error);
    }
  }

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div>
      <div className="heading">
        <h1>Project List</h1>
      </div>
      <div className="project-table-data">
        <table className='project-table'>
          <thead>
            <tr>
              <th className='title'>Title</th>
              <th className='type'>Type</th>
              <th className='mentor'>Mentor</th>
              <th className='skill'>Skill</th>
              <th className='description'>Description</th>
              <th className='details'>More Details</th>
              <th className='project-action'>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((curProject, index) => {
              return (
                <tr key={index}>
                  <td>{curProject.title}</td>
                  <td>{curProject.type}</td>
                  <td>{curProject.mentor ? curProject.mentor : "No mentor assigned"}</td> {/* Added null check */}
                  <td>{curProject.skill}</td>
                  <td>{curProject.description}</td>
                  <td>Data 6</td>
                  <td>
                    <button className='btn-accept btn-action'>
                      Apply
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProjectList;
