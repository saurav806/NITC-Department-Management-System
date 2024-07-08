import React, { useEffect, useState } from 'react';
import './appliedProject.css';
import { useAuth } from '../../../store/auth';

const AppliedProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setProjects(data.projectList || []);
    } catch (error) {
      console.error("Error fetching project", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAppliedProjects();
  }, []);

  return (
    <div>
      <div className="heading">
        <h1>Applied Project</h1>
      </div>
      {loading ? (
        <div className="loading">
          <div className="loading-indicator"></div>
          {/* <p>Loading...</p> */}
        </div>
      ) : projects.length > 0 ? (
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
            <tbody>
              {projects.map((curProject, index) => (
                <tr key={index}>
                  <td>{curProject.title}</td>
                  <td>{curProject.mentorName}</td>
                  <td>{curProject.mentorEmail}</td>
                  <td>{curProject.projectSkill}</td>
                  <td>{curProject.applyDate.split('T')[0]}</td>
                  <td>{curProject.appliedStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>Not applied to any projects</p>
        </div>
      )}
    </div>
  );
};

export default AppliedProject;





// import React, { useEffect, useState } from 'react';
// import './appliedProject.css';
// import { useAuth } from '../../../store/auth';

// const AppliedProject = () => {

// const [projects, setProjects] = useState([]);
//   const { authorizationToken } = useAuth();

//   const getAllAppliedProjects = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/view-applied-project", {
//         method: "GET",
//         headers: {
//           Authorization: authorizationToken,
//           "Content-type": "application/json"
//         },
//       });
//       const data = await response.json();
//       console.log('User data fetched:', data);
//       setProjects(data.projectList || [] );
//     } catch (error) {
//       console.error("Error fetching project", error);
//     }
//   }

//   useEffect(() => {
//     getAllAppliedProjects();
//   }, []);

//   return (
//     <div>
//       <div className="heading">
//         <h1>Applied Project</h1>
//       </div>
//       {projects.length > 0 ? (
//       <div className="project-table-data">
//         <table className='project-table'>
//           <thead>
//             <tr>
//               <th className='title'>Title</th>
//               <th className='mentor'>Mentor</th>
//               <th className='mentor'>Mentor Email</th>
//               <th className='mentor'>Skills</th>
//               <th className='details'>Applied on</th>
//               <th className='description'>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.map((curProject, index) => {
//               return (
//                 <tr key={index}>
//                   <td>{curProject.title}</td>
//                   <td>{curProject.mentorName}</td>
//                   <td>{curProject.mentorEmail}</td>
//                   <td>{curProject.projectSkill}</td>
//                   <td>{curProject.applyDate.split('T')[0]}</td>
//                   <td>{curProject.appliedStatus}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       ) : (
//         <tr>
//           <td colSpan="7">Not applied to any projects</td>
//         </tr>
//       )}
//     </div>
//   )
// }

// export default AppliedProject
