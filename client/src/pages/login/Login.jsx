import React from "react";
import './Login.css';
import { useState } from "react";
import { useAuth } from "../../store/auth";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logimg from "./login.jpg";

const URL = "http://localhost:5000/api/auth/login";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login form", response);
      const res_data = await response.json();

      if (response.ok) {
        toast.success("Login Successful");
        storeTokenInLs(res_data.token);
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.log("Register", error);
    }
  };

  return (
    <>
      <section>
        <div className="login-section">
          <div className="login-container">
            <div className="image">
              <img src={logimg} alt="" width="220px" height="400px"/>
            </div>
            <div className="login-form">
              <h1 className="heading">Login</h1>
              <form onSubmit={handleSubmit} className="form-page">
                <div className="form-data">
                  {/* <label htmlFor="email">email</label> */}
                  <input
                    className="form-input"
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>

                <div className="form-data">
                  {/* <label htmlFor="password">password</label> */}
                  <input
                    className="form-input"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <p>New to DMS? <NavLink to="/register" className="linking">Sign Up</NavLink></p>
                <button className="register-btn btn-submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
