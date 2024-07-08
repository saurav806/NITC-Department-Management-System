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
  const { authorizationToken } = useAuth();

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch(facultyListURL, {
          method: 'GET',
          headers: {
            Authorization: authorizationToken,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        console.log("Raw faculty data:", data); // Log raw data for debugging

        const mappedFaculties = data.map(faculty => ({
          firstname: faculty.firstname,
          lastname: faculty.lastname,
          id: faculty._id,
        }));
        console.log("Mapped faculties:", mappedFaculties); // Log mapped data
        setFaculties(mappedFaculties);
      } catch (error) {
        console.log('Error fetching faculties:', error);
      }
    };

    fetchFaculties();
  }, [authorizationToken]);

  useEffect(() => {
    console.log('Faculties updated:', faculties); // Log faculties state after update
  }, [faculties]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setHall((prevHall) => ({
      ...prevHall,
      [name]: value,
    }));
  };

  const handleSelectFaculty = (e) => {
    const selectedFacultyId = e.target.value;
    setHall((prevHall) => ({
      ...prevHall,
      facultyInchargeID: selectedFacultyId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(hall);

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify(hall),
      });

      if (response.ok) {
        toast.success('Hall Listed');
      } else {
        console.log('Failed to list hall');
      }
    } catch (error) {
      console.log('Hall Listing', error);
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
                    {faculty.firstname} {faculty.lastname}
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









// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../../store/auth';
// import { toast } from 'react-toastify';

// const URL = "http://localhost:5000/api/admin/halls";
// const facultyListURL = "http://localhost:5000/api/auth/faculties";

// function ListHall() {
//   const [hall, setHall] = useState({
//     name: "",
//     location: "",
//     facultyInchargeID: "",
//     staffInchargeName: "",
//     staffInchargeEmail: "",
//     capacity: "",
//     facility: "",
//   });

//   const [faculties, setFaculties] = useState({
//     firstname: "",
//     lastname: "",
//     id: ""
//   });

//   const { authorizationToken } = useAuth();

//   useEffect(() => {
//     const fetchFaculties = async () => {
//       try {
//         const response = await fetch(facultyListURL, {
//           method: 'GET',
//           headers: {
//             Authorization: authorizationToken,
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await response.json();

//         console.log("Raw faculty data:", data); // Log raw data for debugging
         
//         // const mappedFaculties = data.map(faculty => faculty._id);
//         const mappedFaculties = data.map(faculty => ({
//           firstname: faculty.firstname,
//           lastname: faculty.lastname,
//           id: faculty._id,
//         }));
//         console.log("Mapped faculties:", mappedFaculties); // Log mapped data
//         setFaculties(mappedFaculties);
//       } catch (error) {
//         console.log('Error fetching faculties:', error);
//       }
//     };

//     fetchFaculties();
//   }, [authorizationToken]);

//   useEffect(() => {
//     console.log('Faculties updated:', faculties); // Log faculties state after update
//   }, [faculties]);

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setHall((prevHall) => ({
//       ...prevHall,
//       [name]: value,
//     }));
//   };

//   const handleSelectFaculty = (e) => {
//     const selectedFacultyId = e.target.value;
//     setHall((prevHall) => ({
//       ...prevHall,
//       facultyInchargeID: selectedFacultyId,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(hall);

//     try {
//       const response = await fetch(URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: authorizationToken,
//         },
//         body: JSON.stringify(hall),
//       });

//       if (response.ok) {
//         toast.success('Hall Listed');
//       } else {
//         console.log('Failed to list hall');
//       }
//     } catch (error) {
//       console.log('Hall Listing', error);
//     }
//   };

//   return (
//     <div>
//       <div className="hall_body">
//         <div className="heading">
//           <h1>Add Hall</h1>
//         </div>
//         <div className="hall-form">
//           <form onSubmit={handleSubmit} className="form-page">
//             <div className="form-data">
//               <label htmlFor="name">Name</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="name"
//                 placeholder="name"
//                 id="name"
//                 required
//                 autoComplete="off"
//                 value={hall.name}
//                 onChange={handleInput}
//               />
//             </div>
//             <div className="form-data">
//               <label htmlFor="location">Location</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="location"
//                 placeholder="location"
//                 id="location"
//                 required
//                 autoComplete="off"
//                 value={hall.location}
//                 onChange={handleInput}
//               />
//             </div>
//             <div className="form-data">
//               <label htmlFor="facultyInchargeID">Faculty Incharge</label>
//               <select
//                 className="form-input"
//                 name="facultyInchargeID"
//                 id="facultyInchargeID"
//                 required
//                 value={hall.facultyInchargeID}
//                 onChange={handleSelectFaculty}
//               >
//                 <option value="" disabled>
//                   Select Faculty Incharge
//                 </option>
//                 {faculties.map((faculty) => (
//                   <option key={faculty.id} value={faculty}>
//                     {faculty}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-data">
//               <label htmlFor="staffInchargeName">Staff Incharge Name</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="staffInchargeName"
//                 placeholder="staff incharge name"
//                 id="staffInchargeName"
//                 required
//                 autoComplete="off"
//                 value={hall.staffInchargeName}
//                 onChange={handleInput}
//               />
//             </div>
//             <div className="form-data">
//               <label htmlFor="staffInchargeEmail">Staff Incharge Email</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="staffInchargeEmail"
//                 placeholder="staff incharge email"
//                 id="staffInchargeEmail"
//                 required
//                 autoComplete="off"
//                 value={hall.staffInchargeEmail}
//                 onChange={handleInput}
//               />
//             </div>
//             <div className="form-data">
//               <label htmlFor="capacity">Hall Capacity</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="capacity"
//                 placeholder="seating capacity"
//                 id="capacity"
//                 required
//                 autoComplete="off"
//                 value={hall.capacity}
//                 onChange={handleInput}
//               />
//             </div>
//             <div className="form-data">
//               <label htmlFor="facility">Available Facility</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="facility"
//                 placeholder="10 systems, AC, Projector etc..."
//                 id="facility"
//                 required
//                 autoComplete="off"
//                 value={hall.facility}
//                 onChange={handleInput}
//               />
//             </div>
//             <button type="submit" className="register-btn btn-submit">
//               ADD
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ListHall;





// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../../store/auth';
// import { toast } from 'react-toastify';

// const URL = "http://localhost:5000/api/admin/halls";
// const facultyListURL = "http://localhost:5000/api/auth/faculties";

// function ListHall() {
//   const [hall, setHall] = useState({
//     name: "",
//     location: "",
//     facultyInchargeID: "",
//     staffInchargeName: "",
//     staffInchargeEmail: "",
//     capacity: "",
//     facility: "",
//   });

//   const [faculties, setFaculties] = useState([]);
//   const { authorizationToken } = useAuth();

//   useEffect(() => {

//     const fetchFaculties = async () => {
//         try {

//           const response = await fetch(facultyListURL, {
//             method: "GET",
//             headers: {
//               Authorization: authorizationToken,
//               "Content-Type": "application/json",
//             },
//           });
//           const data = await response.json();
// if (Array.isArray(data)) {
//           const mappedFaculties = data.map((faculty) => ({
//             id: faculty.id,
//             name: faculty.name,
//             // Add other properties you need to map here
//           }));
//           setFaculties(mappedFaculties);

//           console.log("extracted", faculties);
//         } else {
//           console.log('Unexpected response data format:', data);
//         }
//         } catch (error) {
//           console.log("Error fetching departments:", error);
//         }
//       };

//       fetchFaculties();
//   }, []);

//   const handleInput = (e) => {
//     let name = e.target.name;
//     let value = e.target.value;
//     setHall({
//       ...hall,
//       [name]: value,
//     });
//   };

//   const handleSelectFaculty = (e) => {
//     const selectedFacultyId = e.target.value;
//     setHall({
//       ...hall,
//       facultyInchargeID: selectedFacultyId,
//     });
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

//       console.log(response);

//       if (response.ok) {
//         toast.success("Hall Listed");
//       } else {
//         console.log("response");
//       }
//     } catch (error) {
//       console.log("Hall Listing", error);
//     }
//   };

//   return (
//     <div>
//       <div className="hall_body">
//         <div className="heading">
//           <h1>Add Hall</h1>
//         </div>
//         <div className="hall-form">
//           <form onSubmit={handleSubmit} className="form-page">
//             <div className="form-data">
//               <label htmlFor="name">Name</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="name"
//                 placeholder="name"
//                 id="name"
//                 required
//                 autoComplete="off"
//                 value={hall.name}
//                 onChange={handleInput}
//               />
//             </div>
//             <div className="form-data">
//               <label htmlFor="location">Location</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="location"
//                 placeholder="location"
//                 id="location"
//                 required
//                 autoComplete="off"
//                 value={hall.location}
//                 onChange={handleInput}
//               />
//             </div>
//             <div className="form-data">
//               <label htmlFor="facultyInchargeID">Faculty Incharge</label>
//               <select
//                 className="form-input"
//                 name="facultyInchargeID"
//                 id="facultyInchargeID"
//                 required
//                 value={hall.facultyInchargeID}
//                 onChange={handleSelectFaculty}
//               >
//                 <option value="" disabled>
//                   Select Faculty Incharge
//                 </option>
//                 {faculties.map((faculty) => (
//                   <option key={faculty.id} value={faculty.id}>
//                     {faculty.firstName} {faculty.lastName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-data">
//               <label htmlFor="staffInchargeName">Staff Incharge Name</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="staffInchargeName"
//                 placeholder="staff incharge name"
//                 id="staffInchargeName"
//                 required
//                 autoComplete="off"
//                 value={hall.staffInchargeName}
//                 onChange={handleInput}
//               />
//             </div>
//             <div className="form-data">
//               <label htmlFor="staffInchargeEmail">Staff Incharge Email</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="staffInchargeEmail"
//                 placeholder="staff incharge email"
//                 id="staffInchargeEmail"
//                 required
//                 autoComplete="off"
//                 value={hall.staffInchargeEmail}
//                 onChange={handleInput}
//               />
//             </div>
//             <div className="form-data">
//               <label htmlFor="capacity">Hall Capacity</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="capacity"
//                 placeholder="seating capacity"
//                 id="capacity"
//                 required
//                 autoComplete="off"
//                 value={hall.capacity}
//                 onChange={handleInput}
//               />
//             </div>
//             <div className="form-data">
//               <label htmlFor="facility">Available Facility</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="facility"
//                 placeholder="10 systems, AC, Projector etc..."
//                 id="facility"
//                 required
//                 autoComplete="off"
//                 value={hall.facility}
//                 onChange={handleInput}
//               />
//             </div>
//             <button type="submit" className="register-btn btn-submit">
//               ADD
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ListHall;