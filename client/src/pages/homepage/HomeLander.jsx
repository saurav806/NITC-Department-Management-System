import React from "react";
import "./HomeLander.css";
import { useAuth } from "../../store/auth";

const HomeLander = () => {
  const { user , isLoggedIn} = useAuth();
  return (
    <>
      <div className="home-body">
        <div className="home-title">
          
          
          <h1>
            Discover and <span>Build</span>
          </h1>
          <h3>
            Our Vision, your Contribution
          </h3>

          
        </div>
        {/* <div className="home-desc">
          
        </div> */}
      </div>


    </>
  );
};

export default HomeLander;
