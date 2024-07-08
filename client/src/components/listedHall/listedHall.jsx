import React, { useEffect, useState } from "react";
import "./listedHall.css";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

const ListedHall = () => {
  const [halls, setHalls] = useState([]);
  const { authorizationToken } = useAuth();
  const [displayMessage, setDisplayMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const getAllHalls = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("http://localhost:5000/api/admin/hall-list", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch halls");
      }

      const data = await response.json();
      const listedHalls = data.halls;

      console.log("hall data",data);

      console.log("listed halls", listedHalls);

      setHalls(listedHalls || []);
    } catch (error) {
      console.error("Error fetching halls", error);
      setDisplayMessage("Error fetching halls");
      setHalls([]);
    } finally {
      setLoading(false); // End loading
    }
  };
  useEffect(() => {
    getAllHalls();
  }, []);

  const handleApplyClick = () => {
    toast.success("clicked");
  };

  return (
    <div>
      {loading ? (
        <div className="loading">
          <div className="loading-indicator"></div>
          <p>Loading Hall...</p>
        </div>
      ) : (
        <>
          <div>
            <div className="heading">
              <h1>Hall List</h1>
            </div>
            <div className="hall-table-data">
              {displayMessage ? (
                <p>{displayMessage}</p>
              ) : (
                <table className="hall-table">
                  <thead>
                    <tr>
                      <th className="name">Name</th>
                      <th className="location">Location</th>
                      <th className="staffInCharge">Staff Incharge</th>
                      <th className="staffInChargeEmail">Staff Incharge Email</th>
                      <th className="facultyInCharge">Faculty Incharge</th>
                      <th className="capacity">Capacity</th>
                      <th className="facility">Facility</th>
                      <th className="facility">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {halls.map((hall, index) => (
                      <tr key={index}>
                        <td>{hall.name}</td>
                        <td>{hall.location}</td>
                        <td>{hall.staffInchargeName}</td>
                        <td>{hall.staffInchargeEmail}</td>
                        <td>Jay Prakash</td>
                        <td>{hall.capacity}</td>
                        <td>{hall.facility}</td>
                        <td>
                          <button
                            className="btn-accept btn-action"
                            onClick={handleApplyClick}
                          >
                            Apply
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListedHall;















// import React, { useEffect, useState } from "react";
// import "./listedHall.css";
// import { toast } from "react-toastify";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../../store/auth";

// const ListedHall = () => {
//   const [halls, setHalls] = useState([]);
//   const { user, authorizationToken } = useAuth();
//   const [displayMessage, setDisplayMessage] = useState();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getAllHalls();
//   }, []);

//   const getAllHalls = async () => {
//     setLoading(true); // Start loading
//     try {
//       const response = await fetch("http://localhost:5000/api/admin/hall-list", {
//         method: "GET",
//         headers: {
//           Authorization: authorizationToken,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch halls");
//       }

//       const data = await response.json();
//       const listedHalls = data.halls;

//       console.log("listed hallse",listedHalls);
//     //   if(listedHalls.length() === 0) setDisplayMessage("No Available Halls");

//       setHalls(listedHalls || []);
//     } catch (error) {
//       console.error("Error fetching halls", error);
//       setHalls([]);
//     } finally {
//       setLoading(false); // End loading
//     }
//   };


//   const handleApplyClick = () => {
//     toast.success("clicked");
//   };

//   return (
//     <div>
//       {loading ? (
//         <div className="loading">
//         <div className="loading-indicator"></div>
//         <p>Loading Hall...</p>
//       </div>
//       ) : (
//         <>
//             <div>
//               <div className="heading">
//                 <h1>Hall List</h1>
//               </div>
//               <div className="hall-table-data">
//                 <table className="hall-table">
//                   <thead >
//                     <tr>
//                       <th className="name">Name</th>
//                       <th className="location">Location</th>
//                       <th className="staffInCharge">Staff Incharge</th>
//                       <th className="staffInChargeEmail">Staff Incharge Email</th>
//                       <th className="facultyInCharge">Faculty Incharge</th>
//                       <th className="capacity">Capacity</th>
//                       <th className="facility">facility</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {halls.map((hall, index) => (
//                       <tr key={index}>
//                         <td>{hall.name}</td>
//                         <td>{hall.location}</td>
//                         <td>{hall.staffIncharge}</td>
//                         <td>
//                           <button
//                             className="btn-accept btn-action"
//                             onClick={() => handleApplyClick(curProject)}
//                           >
//                             Apply
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ListedHall;