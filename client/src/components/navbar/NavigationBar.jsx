// import React, { useState } from "react";
// import "./NavigationBar.css";
// import logo from "./image/logowhite.png";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../../store/auth";

// function NavigationBar() {
//   const { isLoggedIn, user, LogoutUser} = useAuth();

//   const faculty = user ? user.isFaculty : 'guest';
//   const admin = user ? user.isAdmin : 'guest';


//   return (
//     <div>
//       <div className="nav-container">
//         <div className="logo">
//           <NavLink to="/">
//             <img src={logo} alt="logo" />
//           </NavLink>
//         </div>

//         <div className="nav-items">
//           <ul>
//             {/* <li className="lists">
//               <NavLink to="/">Home</NavLink>
//             </li> */}

//             <li className="lists">
//               <NavLink to="/admin">Admin</NavLink>
//             </li>

//             {isLoggedIn && admin &&(
//               <>
//                 <li className="lists">
//                 <NavLink to="/admin-dashboard">Dashboard</NavLink>
//                 </li>
//               </>
//             )}



//             {isLoggedIn && faculty && (
//               <>
//                 <li className="lists">
//                 <NavLink to="/dashboard">Dashboard</NavLink>
//                 </li>
//                 <li className="lists">
//                   <NavLink to="/projects">Project</NavLink>
//                 </li>
//                 <li className="lists">
//                   <NavLink to="/students-request">Request</NavLink>
//                 </li>
//               </>
//             )}

//             {isLoggedIn && !faculty && !admin && (
//               <>
//                 <li className="lists">
//                   <NavLink to="/dashboard">Dashboard</NavLink>
//                 </li>
//                 <li className="lists">
//                   <NavLink to="/projects-list">Project List</NavLink>
//                 </li>
//               </>
//             )}

//             { isLoggedIn ?
//               <>
              
//               <li className="lists">
//                 <NavLink to="/logout">Logout</NavLink>
//               </li>
//               </>
//             : (
//               <>
//                 <li className="lists">
//                   <NavLink to="/register">Register</NavLink>
//                 </li>
//               </>
//             )}

            
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NavigationBar;

import React, { useState, useEffect } from "react";
import "./NavigationBar.css";
import logo from "./image/logowhite.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

function NavigationBar() {
  const { isLoggedIn, user, LogoutUser } = useAuth();
  const [flashMessage, setFlashMessage] = useState(""); // Flash message state

  const faculty = user ? user.isFaculty : 'guest';
  const admin = user ? user.isAdmin : 'guest';

  const handleAdminClick = () => { // Function to handle admin link click
    if (!admin) {
      setFlashMessage("You are not an admin, Please Login as admin to access");
    }
  };

  useEffect(() => { // Effect to remove flash message after 5 seconds
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage("");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  return (
    <div>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>

        <div className="nav-items">
          <ul>
            <li className="lists">
              {isLoggedIn && admin ? (
                <NavLink to="/admin">Admin</NavLink> // Conditional rendering for admin link
              ) : (
                <span onClick={handleAdminClick}>Admin</span> // Non-admin users see a span
              )}
            </li>

            {isLoggedIn && admin && (
              <>
                <li className="lists">
                  <NavLink to="/admin-dashboard">Dashboard</NavLink>
                </li>
              </>
            )}

            {isLoggedIn && faculty && (
              <>
                <li className="lists">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                {/* <li className="lists">
                  <NavLink to="/projects">List Project</NavLink>
                </li>
                <li className="lists">
                  <NavLink to="/students-request">Request</NavLink>
                </li> */}
              </>
            )}

            {isLoggedIn && !faculty && !admin && (
              <>
                <li className="lists">
                  <NavLink to="/student-dashboard">Dashboard</NavLink>
                </li>
                {/* <li className="lists">
                  <NavLink to="/projects-list">Project List</NavLink>
                </li> */}
              </>
            )}

            {isLoggedIn ? (
              <>
                <li className="lists">
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="lists">
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {flashMessage && (
        <div className="flash-message"> {/* Flash message display */}
          {flashMessage}
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
