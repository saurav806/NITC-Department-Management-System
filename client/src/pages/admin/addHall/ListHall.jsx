import React, { useState } from 'react';
import { useAuth } from '../../../store/auth';
import { toast } from 'react-toastify'; 

const URL = "http://localhost:5000/api/list-hall";

function ListHall() {
  const [hall, setHall] = useState({
    title:"",
    description:"",
    skill:"",
    type:"",
  })

  const {user,authorizationToken} = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setHall({
      ...hall,
      [name]: value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(hall);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(hall),
      });

      
      // const res_data = await response.json();
      console.log(response);

      if (response.ok) {
        // storeTokenInLs(res_data.token);
        
        toast.success("Hall Listed");
        // navigate("/");
      }
      else{
        // toast.error( res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.log("response");
      }
    } catch (error) {
      console.log("Hall Listing", error);
    }
  }

  return (
    <div>
      <div className="hall_body">
        <div className="heading">
          <h1>List A Project</h1>
        </div>
        <div className="hall-form">
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
                      value={hall.title}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="description">Hall Description</label>
                    <input
                      className="form-input"
                      type="text"
                      name="description"
                      placeholder="description"
                      id="description"
                      required
                      autoComplete="off"
                      value={hall.description}
                      onChange={handleInput}
                    />
                  </div>
                  <button type="submit" className="register-btn btn-submit">
                    Publish Now
                  </button>
                </form>
              </div>

      </div>
    </div>
  )
}

export default ListHall;
