import React, { useEffect, useState } from "react";
import "./ProjectList.css";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const { user, authorizationToken } = useAuth();
  const [displayMessage, setDisplayMessage] = useState();
  const [countProjects, setCountProjects] = useState([]);

  // State for managing the popup visibility and selected project
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [preference, setPreference] = useState("");


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProjects();
    // Fetch applied projects for the current user
    fetchAppliedProjects();
  }, []);

  const getAllProjects = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      const listedProjects = data.projects;

      if (user.isAssigned) {
        setDisplayMessage("You have already assigned a project");
        setProjects([]);
        return;
      } else {
        setDisplayMessage("No Projects Available");
      }

      const availableProjects = listedProjects.filter(
        (project) => project.status === "Inactive"
      );

      setProjects(availableProjects || []);
    } catch (error) {
      console.error("Error fetching projects", error);
      setProjects([]);
    } finally {
      setLoading(false); // End loading
    }
  };


  const fetchAppliedProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/view-applied-project", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch applied projects");
      }

      const data = await response.json();
      setCountProjects(data.projectList || []);
    } catch (error) {
      console.error("Error fetching applied projects", error);
      setCountProjects([]);
    }
  };

  const handleApplyClick = (project) => {
    fetchAppliedProjects();
    setSelectedProject(project);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProject(null);
    setPreference("");
  };

  const handlePreferenceChange = (e) => {
    setPreference(e.target.value);
  };

  const applyToProject = async () => {
    if (!selectedProject) return;

    // Check if user has already applied to 4 projects
    if (countProjects.length >= 3) {
      toast.error("You have already applied to 4 projects.");
      handleClosePopup();
      return;
    }

    console.log("Count of applied projects",projects);

    const applyData = {
      title: selectedProject.title,
      projectID: selectedProject._id,
      preference: parseInt(preference),
      mentorID: selectedProject.mentor,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/applied-project",
        {
          method: "POST",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(applyData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to apply for project");
      }

      const data = await response.json();
      toast.success("Application successful:", data);
      getAllProjects();
      fetchAppliedProjects(); // Refresh applied projects list
      handleClosePopup();
    } catch (error) {
      toast.error("Error applying for project", error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loading">
        <div className="loading-indicator"></div>
        <p>Loading Projects...</p>
      </div>
      ) : (
        <>
          {projects.length > 0 ? (
            <div>
              <div className="heading">
                <h1>Project List</h1>
              </div>
              <div className="project-table-data">
                <table className="project-table">
                  <thead >
                    <tr>
                      <th className="title">Title</th>
                      <th className="type">Type</th>
                      <th className="mentor">Mentor</th>
                      <th className="skill">Skill</th>
                      <th className="description">Description</th>
                      {/* <th className="details">More Details</th> */}
                      <th className="project-action">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((curProject, index) => (
                      <tr key={index}>
                        <td>{curProject.title}</td>
                        <td>{curProject.type}</td>
                        <td>
                          {curProject.mentorName
                            ? curProject.mentorName
                            : "No mentor assigned"}
                        </td>
                        <td>{curProject.skill}</td>
                        <td>{curProject.description}</td>
                        {/* <td>Data 6</td> */}
                        <td>
                          <button
                            className="btn-accept btn-action"
                            onClick={() => handleApplyClick(curProject)}
                          >
                            Apply
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <p>{displayMessage}</p>
            </div>
          )}
        </>
      )}

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              X
            </span>
            <h2>Apply to {selectedProject.title}</h2>
            <label>
              Preference:
              <input
                type="number"
                value={preference}
                onChange={handlePreferenceChange}
              />
            </label>
            <button className="btn-accept btn-action" onClick={applyToProject}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;




// import React, { useEffect, useState } from "react";
// import "./ProjectList.css";
// import { useAuth } from "../../../store/auth";
// import { toast } from "react-toastify";
// import { NavLink } from "react-router-dom";

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   const { user, authorizationToken } = useAuth();
//   const [displayMessage, setDisplayMessage] = useState();

//   // State for managing the popup visibility and selected project
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [preference, setPreference] = useState("");

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
//         throw new Error("Failed to fetch projects");
//       }

//       const data = await response.json();
//       const listedProjects = data.projects;

//       if (user.isAssigned) {
//         setDisplayMessage("You have already assigned a project");
//         setProjects([]);
//         return
//       }
//       else{
//         setDisplayMessage("No Projects Available");
//       }

//       const availableProjects = listedProjects.filter(
//         (project) => project.status === "Inactive"
//       );

//       setProjects(availableProjects || []);
//     } catch (error) {
//       console.error("Error fetching projects", error);
//       setProjects([]);
//     }
//   };

//   useEffect(() => {
//     getAllProjects();
//   }, []);

//   // Handler for opening the popup
//   const handleApplyClick = (project) => {
//     setSelectedProject(project);
//     setIsPopupOpen(true);
//   };

//   // Handler for closing the popup
//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedProject(null);
//     setPreference("");
//   };

//   // Handler for input change in the popup
//   const handlePreferenceChange = (e) => {
//     setPreference(e.target.value);
//   };

//   // Function to apply to a project with the input preference
//   const applyToProject = async () => {
//     if (!selectedProject) return;

//     const applyData = {
//       title: selectedProject.title,
//       projectID: selectedProject._id,
//       preference: parseInt(preference),
//       mentorID: selectedProject.mentor,
//     };

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/applied-project",
//         {
//           method: "POST",
//           headers: {
//             Authorization: authorizationToken,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(applyData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to apply for project");
//       }

//       const data = await response.json();
//       toast.success("Application successful:", data);

//       handleClosePopup();
//     } catch (error) {
//       toast.error("Error applying for project", error.message);
//     }
//   };

//   return (
//     <div>
//       {projects.length > 0 ? (
//         <div>
//           <div className="heading">
//             <h1>Project List</h1>
//           </div>
//           <div className="project-table-data">
//             <table className="project-table">
//               <thead>
//                 <tr>
//                   <th className="title">Title</th>
//                   <th className="type">Type</th>
//                   <th className="mentor">Mentor</th>
//                   <th className="skill">Skill</th>
//                   <th className="description">Description</th>
//                   <th className="details">More Details</th>
//                   <th className="project-action">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {projects.map((curProject, index) => (
//                   <tr key={index}>
//                     <td>{curProject.title}</td>
//                     <td>{curProject.type}</td>
//                     <td>
//                       {curProject.mentorName
//                         ? curProject.mentorName
//                         : "No mentor assigned"}
//                     </td>
//                     <td>{curProject.skill}</td>
//                     <td>{curProject.description}</td>
//                     <td>Data 6</td>
//                     <td>
//                       <button
//                         className="btn-accept btn-action"
//                         onClick={() => handleApplyClick(curProject)}
//                       >
//                         Apply
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <tr>
//           <td colSpan="7">{displayMessage}</td>
//         </tr>
//       )}

//       {/* Popup for taking preference input */}
//       {isPopupOpen && (
//         <div className="popup">
//           <div className="popup-content">
//             <span className="close" onClick={handleClosePopup}>
//               X
//             </span>
//             <h2>Apply to {selectedProject.title}</h2>
//             <label>
//               Preference:
//               <input
//                 type="number"
//                 value={preference}
//                 onChange={handlePreferenceChange}
//               />
//             </label>
//             <button className="btn-accept btn-action" onClick={applyToProject}>
//               Submit
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectList;
