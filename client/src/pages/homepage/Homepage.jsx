import React from 'react';
import './Homepage.css'
import { Link } from 'react-router-dom';


function Homepage() {
  return (
    <div className='home-container'>
      <div className="heading">
        <h3>Final Year Project</h3>
      </div>
      <div className="sub-head">
        <h1>Got an idea !!!</h1>
      </div>

      <div className="list-button">
        <button className="btn">
          <Link to="/projects" style={{ textDecoration: 'none' }}>
            <p>List A Project</p>
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Homepage
