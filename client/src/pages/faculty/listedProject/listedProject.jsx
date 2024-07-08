import React, { useEffect, useState } from 'react';
import './listedProject.css';
import { useAuth } from '../../../store/auth';

const ListedProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authorizationToken } = useAuth();

  const getAllProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Error fetching projects", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div>
      <div className="heading">
        <h1>Project List</h1>
      </div>
      {loading ? (
        <div className="loading">
          <div className="loading-indicator"></div>
          {/* <p>Loading...</p> */}
        </div>
      ) : (
        <div className="project-table-data">
          <table className='project-table'>
            <thead>
              <tr>
                <th className='title'>Title</th>
                <th className='type'>Type</th>
                <th className='skill'>Skill</th>
                <th className='description'>Description</th>
                <th className='status'>Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((curProject, index) => (
                  <tr key={index}>
                    <td>{curProject.title}</td>
                    <td>{curProject.type}</td>
                    <td>{curProject.skill}</td>
                    <td>{curProject.description}</td>
                    <td>{curProject.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No projects available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListedProject;










// import React, { useEffect, useState } from 'react';
// import './listedProject.css';
// import { useAuth } from '../../../store/auth';
// import { toast } from "react-toastify";
// import { NavLink } from "react-router-dom";

// const ListedProject = () => {
//   const [projects, setProjects] = useState([]);
//   const { authorizationToken } = useAuth();

//   const getAllProjects = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/projects", {
//         method: "GET",
//         headers: {
//           Authorization: authorizationToken,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch projects');
//       }

//       const data = await response.json();

      
//       const mentorIds = data.projects.map(project => project.mentor);
//       console.log("mentorIds", mentorIds)

//       setProjects(data.projects || []);
//     } catch (error) {
//       console.error("Error fetching projects", error);
//       setProjects([]);
//     }
//   };

//   useEffect(() => {
//     getAllProjects();
//   }, []);

//   return (
//     <div>
//       <div className="heading">
//         <h1>Project List</h1>
//       </div>
//       <div className="project-table-data">
//         <table className='project-table'>
//           <thead>
//             <tr>
//               <th className='title'>Title</th>
//               <th className='type'>Type</th>
//               {/* <th className='mentor'>Mentor</th> */}
//               <th className='skill'>Skill</th>
//               <th className='description'>Description</th>
//               <th className='status'>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.length > 0 ? (
//               projects.map((curProject, index) => (
//                 <tr key={index}>
//                   <td>{curProject.title}</td>
//                   <td>{curProject.type}</td>
//                   {/* <td>{curProject.mentorName ? curProject.mentorName : "No mentor assigned"}</td> */}
//                   <td>{curProject.skill}</td>
//                   <td>{curProject.description}</td>
//                   <td>{curProject.status}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">No projects available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ListedProject;
