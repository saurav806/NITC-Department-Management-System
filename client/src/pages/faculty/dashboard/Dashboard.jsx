import React, { useState } from 'react';
import ListProject from '../addProject/ListProject';
import StudentRequest from '../studentRequest/StudentRequest'
import './Dashboard.css';

const Dashboard = () => {
  const [activeOption, setActiveOption] = useState('Overview');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const options = ['List A Project', 'Project Request List', 'Your Project(s)'];

  const renderContent = () => {
    switch (activeOption) {
      case 'List A Project':
        return <ListProject />;
      case 'Project Request List':
        return <StudentRequest/>;
      case 'Your Project(s)':
        return <div>Your Project(s) Content</div>;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="dashboard">
      <div className={`sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
        {options.map(option => (
          <div
            key={option}
            className={`sidebar-option ${activeOption === option ? 'active' : ''}`}
            onClick={() => setActiveOption(option)}
          >
            {option}
          </div>
        ))}
        <div 
          className={`toggle-btn ${isSidebarVisible ? '' : 'hidden'}`}
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          {isSidebarVisible ? '←' : '→'}
        </div>
      </div>
      <div 
        className="show-btn"
        onClick={() => setIsSidebarVisible(true)}
      >
        →
      </div>
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;





























// import React, { useState } from 'react';
// import ListProject from '../addProject/ListProject';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [activeOption, setActiveOption] = useState('Overview');

//   const options = ['List A Project', 'Project Request List', 'Your Project(s)', 'Profile'];

//   const renderContent = () => {
//     switch (activeOption) {
//       case 'List A Project':
//         return <ListProject/>;
//       case 'Project Request List':
//         return <div>Profile Content</div>;
//       case 'Your Project(s)':
//         return <div>Settings Content</div>;
//       case 'Profile':
//         return <div>Reports Content</div>;
//       default:
//         return <div>Select an option from the sidebar</div>;
//     }
//   };

//   return (
//     <div className="dashboard">
//       <div className="sidebar">
//         {options.map(option => (
//           <div
//             key={option}
//             className={`sidebar-option ${activeOption === option ? 'active' : ''}`}
//             onClick={() => setActiveOption(option)}
//           >
//             {option}
//           </div>
//         ))}
//       </div>
//       <div className="main-content">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

















































// import React, { useState } from 'react';
// import { useAuth } from '../../../store/auth';

// function Dashboard() {
//   const {user}  = useAuth();
//   React.useEffect(()=>{
//     if (!user) {
//       console.log("user ",JSON.stringify(user));
//     }
//   },[user])

//   console.log("Rendering Dashboard, user:", user);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>hiir {user.email} </h1>
      



//     </div>
//   )
// }

// export default Dashboard;