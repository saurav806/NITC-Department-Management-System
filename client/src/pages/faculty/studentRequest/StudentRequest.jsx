import React, { useEffect, useState } from "react";
import "./StudentRequest.css";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";

const StudentRequest = () => {
  const [projects, setProjects] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllAppliedProjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/view-applied-project",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("User data fetched:", data);

      const request = data.projectList.filter(
        (project) => project.appliedStatus === "Applied"
      );

      console.log("Applied projects", request);

      setProjects(request || []);
    } catch (error) {
      console.error("Error fetching applied projects", error);
    }
  };

  useEffect(() => {
    getAllAppliedProjects();
  }, []);

  const updateProjectStatus = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        return true;
      } else {
        const errorText = await response.text();
        console.error("Failed to update project status:", errorText);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleAcceptButton = async (projectID, listedProjectID, studentID, index) => {
    const success1 = await updateProjectStatus("http://localhost:5000/api/update-applied-project", { projectId: projectID, status: "Assigned" });
    const success2 = await updateProjectStatus("http://localhost:5000/api/update-listed-project", { projectId: listedProjectID, status: "Active" });
    const success3 = await updateProjectStatus("http://localhost:5000/api/auth/update-user", { email: studentID, status: "true" });

    if (success1 && success2 && success3) {
      toast.success("Project accepted");
      // Refresh the project list
      getAllAppliedProjects();
    } else {
      toast.error("Failed to accept project");
    }
  };

  const handleRejectButton = async (projectID, index) => {
    const success = await updateProjectStatus("http://localhost:5000/api/update-applied-project", { projectId: projectID, status: "Rejected" });

    if (success) {
      toast.success("Project rejected");
      // Refresh the project list
      getAllAppliedProjects();
    } else {
      toast.error("Failed to reject project");
    }
  };

  return (
    <div>
      <div className="heading">
        <h1>Students Request</h1>
      </div>

      {projects.length > 0 ? (
        <div className="project-table-data">
          <table className="project-table">
            <thead>
              <tr>
                <th className="title">Title</th>
                <th className="mentor">Student Name</th>
                <th className="mentor">Student Email</th>
                <th className="details">Preference</th>
                <th className="details">Status</th>
                <th className="description">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((curProject, index) => (
                <tr key={index}>
                  <td>{curProject.title}</td>
                  <td>{curProject.studentName}</td>
                  <td>{curProject.studentEmail}</td>
                  <td>{curProject.preference}</td>
                  <td>{curProject.appliedStatus}</td>
                  <td>
                    <button
                      className="btn-action btn-accept"
                      onClick={() => handleAcceptButton(curProject._id, curProject.projectID, curProject.studentEmail, index)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn-action btn-reject"
                      onClick={() => handleRejectButton(curProject._id, index)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>There are no requests</div>
      )}
    </div>
  );
};

export default StudentRequest;
