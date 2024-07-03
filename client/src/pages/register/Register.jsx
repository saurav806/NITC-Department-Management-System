import React, { useState, useEffect } from "react";
import "./Register.css";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Regimg from "./register.jpg";
import { NavLink } from "react-router-dom";

const URL = "http://localhost:5000/api/auth/register";
const departmentListURL = "http://localhost:5000/api/departments"
const courseListURL = "http://localhost:5000/api/courses"


function Register() {
  const [user, setUser] = useState({
    rollno: "",
    firstname: "",
    lastname: "",
    batch: "",
    course: "",
    department: "",
    email: "",
    phone: "",
    password: "",
    cnfPassword: "",
  });

  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);


  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(departmentListURL);
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.log("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

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
      if (user.cnfPassword !== user.password) {
        toast.error("Passwords do not match");
        setUser({
          ...user,
          password: "",
          cnfPassword: "",
        });
      } else {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const res_data = await response.json();

        if (response.ok) {
          storeTokenInLs(res_data.token);
          toast.success("Registration Successful");
          navigate("/");
        } else {
          toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
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
                <img src={Regimg} alt="" width="220px" height="400px" />
              </div>
              <div className="registration-form">
                <h1 className="heading">Register</h1>

                <form onSubmit={handleSubmit} className="form-page">
                  <div className="name-section">
                    <div className="form-data">
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
                      <input
                        className="form-input"
                        type="text"
                        name="lastname"
                        placeholder="Last name"
                        id="lastname"
                        autoComplete="off"
                        value={user.lastname}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="name-section">
                    <div className="form-data">
                      <select
                        className="drop-input"
                        name="course"
                        id="course"
                        required
                        value={user.course}
                        onChange={handleInput}
                      >
                        <option value="course">
                          Select your course
                        </option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.name}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-data">
                      <input
                        className="form-input"
                        type="text"
                        name="rollno"
                        placeholder="Roll no"
                        id="rollno"
                        required
                        autoComplete="off"
                        value={user.rollno}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="name-section">
                    <div className="form-data">
                      <select
                        className="drop-input"
                        name="department"
                        id="department"
                        required
                        value={user.department}
                        onChange={handleInput}
                      >
                        <option value="department">
                          Select your department
                        </option>
                        {departments.map((department) => (
                          <option key={department.id} value={department.name}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-data">
                      <input
                        className="form-input"
                        type="text"
                        name="batch"
                        placeholder="Admission year"
                        id="batch"
                        required
                        autoComplete="off"
                        value={user.batch}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="form-data">
                    <input
                      className="form-input"
                      type="text"
                      name="email"
                      placeholder="Email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="form-data">
                    <input
                      className="form-input"
                      type="number"
                      name="phone"
                      placeholder="Mobile number"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="form-data">
                    <input
                      className="form-input"
                      type="password"
                      name="password"
                      placeholder="Set password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-data">
                    <input
                      className="form-input"
                      type="password"
                      name="cnfPassword"
                      placeholder="Confirm password"
                      id="cnfPassword"
                      required
                      autoComplete="off"
                      value={user.cnfPassword}
                      onChange={handleInput}
                    />
                  </div>
                  <p>
                    Already registered?{" "}
                    <NavLink to="/login" className="linking">
                      Login
                    </NavLink>
                  </p>
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
