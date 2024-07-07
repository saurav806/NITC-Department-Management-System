import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = (props) => {
  const [activeOption, setActiveOption] = useState(props.options[0].name);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const renderContent = () => {
    const activeOptionObj = props.options.find(option => option.name === activeOption);
    const ActiveComponent = activeOptionObj ? activeOptionObj.component : null;
    return ActiveComponent ? <ActiveComponent /> : <div>Select an option from the sidebar</div>;
  };

  return (
    <div className="dashboard">
      <div className={`sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
        {props.options.map(option => (
          <div
            key={option.name}
            className={`sidebar-option ${activeOption === option.name ? 'active' : ''}`}
            onClick={() => setActiveOption(option.name)}
          >
            {option.name}
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

export default Sidebar;
