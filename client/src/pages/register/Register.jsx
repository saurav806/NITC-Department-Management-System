import React, { useState } from "react";
import "./Register.css";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Regimg from "./register.jpg";
import { NavLink } from "react-router-dom";

const URL = "http://localhost:5000/api/auth/register";

function Register() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    cnfPassword: "jdshfkjhds",
  });

  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // console.log(response);
      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLs(res_data.token);
        // setUser()
        toast.success("Registration Successful");
        navigate("/");
      }
      else{
        toast.error( res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log("Register", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="register-container">
              <div className="registration-image">
                <img src={Regimg} alt="" width="220px" height="400px"/>
              </div>
              <div className="registration-form">
                <h1 className="heading">Register</h1>

                <form onSubmit={handleSubmit} className="form-page">
                  <div className="form-data">
                    {/* <label htmlFor="email">Email</label> */}
                    <input
                      className="form-input"
                      type="text"
                      name="email"
                      placeholder="Your email address"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  

                  <div className="name-section">
                    <div className="form-data">
                      {/* <label htmlFor="firstname">First Name</label> */}
                      <input
                        className="form-input"
                        type="text"
                        name="firstname"
                        placeholder="First name"
                        id="firstname"
                        required
                        autoComplete="off"
                        value={user.firstname}
                        onChange={handleInput}
                        />
                    </div>
                    <div className="form-data">
                      {/* <label htmlFor="lastname">Last Name</label> */}
                      <input
                        className="form-input"
                        type="text"
                        name="lastname"
                        placeholder="Last name"
                        id="lastname"
                        // required
                        autoComplete="off"
                        value={user.lastname}
                        onChange={handleInput}
                        />
                    </div>
                  </div>
                  <div className="form-data">
                    {/* <label htmlFor="phone">Phone</label> */}
                    <input
                      className="form-input"
                      type="number"
                      name="phone"
                      placeholder="Your phone number"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-data">
                    {/* <label htmlFor="password">Password</label> */}
                    <input
                      className="form-input"
                      type="password"
                      name="password"
                      placeholder="Your password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-data">
                    {/* <label htmlFor="password">Password</label> */}
                    <input
                      className="form-input"
                      type="password"
                      name="cnfPassword"
                      placeholder="Confirm your password"
                      id="cnfPassword"
                      required
                      autoComplete="off"
                      value={user.cnfPassword}
                      onChange={handleInput}
                    />
                  </div>
                  <p>Already registered ? <NavLink to="/login" className="linking">Login</NavLink></p>
                  <button type="submit" className="register-btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default Register;
