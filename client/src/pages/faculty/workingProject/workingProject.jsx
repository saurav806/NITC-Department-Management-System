import React, { useEffect, useState } from 'react';
import './workingProject.css';
import { useAuth } from '../../../store/auth';

const WorkingProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authorizationToken } = useAuth();

  const getAllAppliedProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/view-applied-project", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-type": "application/json"
        },
      });
      const data = await response.json();

      // Filter the projects with appliedStatus "Assigned"
      const working = data.projectList.filter(project => project.appliedStatus === "Assigned");

      console.log('User data fetched:', working);
      setProjects(working || []);
    } catch (error) {
      console.error("Error fetching project", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllAppliedProjects();
  }, []);

  return (
    <div>
      <div className="heading">
        <h1>Working Project</h1>
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
                <th className='mentor'>Student Name</th>
                <th className='mentor'>Student Email</th>
                <th className='mentor'>Student Phone</th>
                <th className='mentor'>Category</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((curProject, index) => {
                return (
                  <tr key={index}>
                    <td>{curProject.title}</td>
                    <td>{curProject.studentName}</td>
                    <td>{curProject.studentEmail}</td>
                    <td>{curProject.studentPhone}</td>
                    <td>{curProject.projectType}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>There are no working projects at the moment.</p>
        </div>
      )}
    </div>
  )
}

export default WorkingProject;





// import React, { useEffect, useState } from 'react';
// import './workingProject.css';
// import { useAuth } from '../../../store/auth';

// const WorkingProject = () => {
//   const [projects, setProjects] = useState([]);
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

//       // Filter the projects with appliedStatus "Assigned"
//       const working = data.projectList.filter(project => project.appliedStatus === "Assigned");

//       console.log('User data fetched:', working);
//       setProjects(working || []);
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
//         <h1>Working Project</h1>
//       </div>
//       {projects.length > 0 ? (
//         <div className="project-table-data">
//           <table className='project-table'>
//             <thead>
//               <tr>
//                 <th className='title'>Title</th>
//                 <th className='mentor'>Student Name</th>
//                 <th className='mentor'>Student Email</th>
//                 <th className='mentor'>Student Phone</th>
//                 <th className='mentor'>Category</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map((curProject, index) => {
//                 return (
//                   <tr key={index}>
//                     <td>{curProject.title}</td>
//                     <td>{curProject.studentName}</td>
//                     <td>{curProject.studentEmail}</td>
//                     <td>{curProject.studentPhone}</td>
//                     <td>{curProject.projectType}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div>
//           <p>There are no working projects at the moment.</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default WorkingProject;
