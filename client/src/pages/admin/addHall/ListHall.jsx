import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../store/auth';
import { toast } from 'react-toastify';

const URL = "http://localhost:5000/api/admin/halls";
const facultyListURL = "http://localhost:5000/api/auth/faculties";

function ListHall() {
  const [hall, setHall] = useState({
    name: "",
    location: "",
    facultyInchargeID: "",
    staffInchargeName: "",
    staffInchargeEmail: "",
    capacity: "",
    facility: "",
  });

  const [faculties, setFaculties] = useState([]);
  const { user, authorizationToken } = useAuth();

  useEffect(() => {

    const fetchFaculties = async () => {
        try {
          const response = await fetch(facultyListURL);
          const data = await response.json();

        console.log("faculty data", data);

          if (data && data.faculties) {
            setFaculties(data.facultyList);
          } else {
            console.error("Invalid faculties data format:", data); 
          }
        //   setDepartments(data);
        } catch (error) {
          console.log("Error fetching departments:", error);
        }
      };
      fetchFaculties();

  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setHall({
      ...hall,
      [name]: value,
    });
  };

  const handleSelectFaculty = (e) => {
    const selectedFacultyId = e.target.value;
    setHall({
      ...hall,
      facultyInchargeID: selectedFacultyId,
    });
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

      console.log(response);

      if (response.ok) {
        toast.success("Hall Listed");
      } else {
        console.log("response");
      }
    } catch (error) {
      console.log("Hall Listing", error);
    }
  };

  return (
    <div>
      <div className="hall_body">
        <div className="heading">
          <h1>Add Hall</h1>
        </div>
        <div className="hall-form">
          <form onSubmit={handleSubmit} className="form-page">
            <div className="form-data">
              <label htmlFor="name">Name</label>
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="name"
                id="name"
                required
                autoComplete="off"
                value={hall.name}
                onChange={handleInput}
              />
            </div>
            <div className="form-data">
              <label htmlFor="location">Location</label>
              <input
                className="form-input"
                type="text"
                name="location"
                placeholder="location"
                id="location"
                required
                autoComplete="off"
                value={hall.location}
                onChange={handleInput}
              />
            </div>
            <div className="form-data">
              <label htmlFor="facultyInchargeID">Faculty Incharge</label>
              <select
                className="form-input"
                name="facultyInchargeID"
                id="facultyInchargeID"
                required
                value={hall.facultyInchargeID}
                onChange={handleSelectFaculty}
              >
                <option value="" disabled>
                  Select Faculty Incharge
                </option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.firstName} {faculty.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-data">
              <label htmlFor="staffInchargeName">Staff Incharge Name</label>
              <input
                className="form-input"
                type="text"
                name="staffInchargeName"
                placeholder="staff incharge name"
                id="staffInchargeName"
                required
                autoComplete="off"
                value={hall.staffInchargeName}
                onChange={handleInput}
              />
            </div>
            <div className="form-data">
              <label htmlFor="staffInchargeEmail">Staff Incharge Email</label>
              <input
                className="form-input"
                type="text"
                name="staffInchargeEmail"
                placeholder="staff incharge email"
                id="staffInchargeEmail"
                required
                autoComplete="off"
                value={hall.staffInchargeEmail}
                onChange={handleInput}
              />
            </div>
            <div className="form-data">
              <label htmlFor="capacity">Hall Capacity</label>
              <input
                className="form-input"
                type="text"
                name="capacity"
                placeholder="seating capacity"
                id="capacity"
                required
                autoComplete="off"
                value={hall.capacity}
                onChange={handleInput}
              />
            </div>
            <div className="form-data">
              <label htmlFor="facility">Available Facility</label>
              <input
                className="form-input"
                type="text"
                name="facility"
                placeholder="10 systems, AC, Projector etc..."
                id="facility"
                required
                autoComplete="off"
                value={hall.facility}
                onChange={handleInput}
              />
            </div>
            <button type="submit" className="register-btn btn-submit">
              ADD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ListHall;








// import React, { useState } from 'react';
// import { useAuth } from '../../../store/auth';
// import { toast } from 'react-toastify';

// const URL = "http://localhost:5000/api/admin/halls";
// const facultyListURL = "http://localhost:5000/api/auth/faculties";

// function ListHall() {
//   const [hall, setHall] = useState({
//     name:"",
//     location:"",
//     // facultyInchargeID:""
//     staffInchargeName:"",
//     staffInchargeEmail:"",
//     capacity:"",
//     facility:"",
//   })

//   const {user,authorizationToken} = useAuth();

//   const handleInput = (e) => {
//     let name = e.target.name;
//     let value = e.target.value;
//     setHall({
//       ...hall,
//       [name]: value,
//     })
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(hall);

//     try {
//       const response = await fetch(URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: authorizationToken,
//         },
//         body: JSON.stringify(hall),
//       });

      
//       // const res_data = await response.json();
//       console.log(response);

//       if (response.ok) {
//         // storeTokenInLs(res_data.token);
        
//         toast.success("Hall Listed");
//         // navigate("/");
//       }
//       else{
//         // toast.error( res_data.extraDetails ? res_data.extraDetails : res_data.message);
//         console.log("response");
//       }
//     } catch (error) {
//       console.log("Hall Listing", error);
//     }
//   }

//   return (
//     <div>
//       <div className="hall_body">
//         <div className="heading">
//           <h1>Add Hall</h1>
//         </div>
//         <div className="hall-form">
//                 {/* <h1 className="heading">Registration form</h1> */}

//                 <form onSubmit={handleSubmit} className="form-page">
//                   <div className="form-data">
//                     <label htmlFor="name">Name</label>
//                     <input
//                       className="form-input"
//                       type="text"
//                       name="name"
//                       placeholder="name"
//                       id="name"
//                       required
//                       autoComplete="off"
//                       value={hall.name}
//                       onChange={handleInput}
//                     />
//                   </div>
//                   <div className="form-data">
//                     <label htmlFor="location">Location</label>
//                     <input
//                       className="form-input"
//                       type="text"
//                       name="location"
//                       placeholder="location"
//                       id="location"
//                       required
//                       autoComplete="off"
//                       value={hall.location}
//                       onChange={handleInput}
//                     />
//                   </div>
//                   <div className="form-data">
//                     <label htmlFor="description">Faculty Incharge</label>
//                     <input
//                       className="form-input"
//                       type="text"
//                       name="description"
//                       placeholder="description"
//                       id="description"
//                       required
//                       autoComplete="off"
//                       value={hall.facultyInchargeID}
//                       onChange={handleInput}
//                     />
//                   </div>
//                   <div className="form-data">
//                     <label htmlFor="staffInchargeName">Staff Incharge Name</label>
//                     <input
//                       className="form-input"
//                       type="text"
//                       name="staffInchargeName"
//                       placeholder="staff incharge name"
//                       id="staffInchargeName"
//                       required
//                       autoComplete="off"
//                       value={hall.staffInchargeName}
//                       onChange={handleInput}
//                     />
//                   </div>
//                   <div className="form-data">
//                     <label htmlFor="staffInchargeEmail">Staff Incharge Email</label>
//                     <input
//                       className="form-input"
//                       type="text"
//                       name="staffInchargeEmail"
//                       placeholder="staff incharge email"
//                       id="staffInchargeEmail"
//                       required
//                       autoComplete="off"
//                       value={hall.staffInchargeEmail}
//                       onChange={handleInput}
//                     />
//                   </div>
//                   <div className="form-data">
//                     <label htmlFor="capacity">Hall Capacity</label>
//                     <input
//                       className="form-input"
//                       type="text"
//                       name="capacity"
//                       placeholder="seating capacity"
//                       id="capacity"
//                       required
//                       autoComplete="off"
//                       value={hall.capacity}
//                       onChange={handleInput}
//                     />
//                   </div>
//                   <div className="form-data">
//                     <label htmlFor="facility">Available Facility</label>
//                     <input
//                       className="form-input"
//                       type="text"
//                       name="facility"
//                       placeholder="10 systems, AC, Projector etc..."
//                       id="facility"
//                       required
//                       autoComplete="off"
//                       value={hall.facility}
//                       onChange={handleInput}
//                     />
//                   </div>
//                   <button type="submit" className="register-btn btn-submit">
//                     ADD
//                   </button>
//                 </form>
//               </div>

//       </div>
//     </div>
//   )
// }

// export default ListHall;
