import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../store/auth";

const URL = "http://localhost:5000/api/auth/faclogin";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Login Successful");
        storeTokenInLs(responseData.token);
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(
          responseData.extraDetails ? responseData.extraDetails : "Login failed"
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="login-section">
        <div className="login-container">
          <div className="image">
            <p>Image here</p>
          </div>
          <div className="login-form">
            <h1 className="heading">Login</h1>
            <form onSubmit={handleSubmit} className="form-page">
              <div className="form-data">
                <label htmlFor="email">Email</label>
                <input
                  className="form-input"
                  type="email"
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
                <label htmlFor="password">Password</label>
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>
              <button className="register-btn btn-submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
