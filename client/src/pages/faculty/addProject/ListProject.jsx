import React, { useState } from 'react';
import { useAuth } from '../../../store/auth';
import { toast } from 'react-toastify'; 

const URL = "http://localhost:5000/api/auth/projects";

function ListProject() {
  const [project, setProject] = useState({
    title:"",
    description:"",
    skill:"",
    type:"",
  })

  const {user} = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProject({
      ...project,
      [name]: value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(project);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      
      const res_data = await response.json();

      if (response.ok) {
        // storeTokenInLs(res_data.token);
        
        toast.success("Project Listed");
        // navigate("/");
      }
      else{
        toast.error( res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log("Project Listing", error);
    }
  }

  return (
    <div>
      <div className="project_body">
        <div className="heading">
          <h1>List A Project</h1>
        </div>
        <div className="project-form">
                {/* <h1 className="heading">Registration form</h1> */}

                <form onSubmit={handleSubmit} className="form-page">
                  <div className="form-data">
                    <label htmlFor="title">Title</label>
                    <input
                      className="form-input"
                      type="text"
                      name="title"
                      placeholder="title"
                      id="title"
                      required
                      autoComplete="off"
                      value={project.title}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="description">Project Description</label>
                    <input
                      className="form-input"
                      type="text"
                      name="description"
                      placeholder="description"
                      id="description"
                      required
                      autoComplete="off"
                      value={project.description}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="skill">Skills Required</label>
                    <input
                      className="form-input"
                      type="text"
                      name="skill"
                      placeholder="skill"
                      id="skill"
                      required
                      autoComplete="off"
                      value={project.skill}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="type">Project Type</label>
                    <input
                      className="form-input"
                      type="string"
                      name="type"
                      placeholder="type"
                      id="type"
                      required
                      autoComplete="off"
                      value={project.type}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="firstname">Mentor</label>
                    <input
                      className="form-input"
                      type="string"
                      name="mentor"
                      placeholder={user.firstname}
                      id="mentor"
                      required
                      autoComplete="off"
                      value={user.firstname}
                      readOnly
                    />
                  </div>
                  <button type="submit" className="register-btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>

      </div>
    </div>
  )
}

export default ListProject;
