import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "Email") setEmail(value);
    if (name === "Password") setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const query = `
      mutation {
        token(username: "${email}", password: "${password}") {
          message
        }
      }
    `;

    try {
      const response = await fetch("https://localhost:7111/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      if (response.status === 200)
      {
        const tokenMessage = result.data.token.message;
        
        localStorage.setItem("token", tokenMessage);
        toast.success("Login successful!");
        login(tokenMessage);
        navigate("/");
      }
      else {
        const errorMessage = result.errors.map((err) => err.message).join(", ");
        toast.error("Error: " + errorMessage);
        setMessage("Error: " + errorMessage);
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
      setMessage("Network error: " + error.message);
    }
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-wrap p-4 p-md-5">
              <div className="icon d-flex align-items-center justify-content-center">
                <span className="fas fa-user"></span>
              </div>
              <h3 className="text-center mb-4">Log In</h3>
              <p className="text-center">
                To register your free account{" "}
                <Link to="/registerPage">
                  <strong>click here</strong>
                </Link>
                !
              </p>

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control rounded-left"
                    placeholder="Email"
                    name="Email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group d-flex">
                  <input
                    type="password"
                    className="form-control rounded-left"
                    placeholder="Password"
                    name="Password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group d-md-flex justify-content-center">
                  <div className="w-100 text-center">
                    <Link to="/resetPasswordPage" className="forgot-password-link">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="btn btn-primary rounded submit p-3 px-5"
                  >
                    Log In
                  </button>
                </div>
              </form>

              {message && (
                <div className="alert alert-info mt-3">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
