import "./login.css"; // Reuse the same styles for consistency
import React, { Component } from "react";
import { withRouter } from './withRouter'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { password, confirmPassword } = this.state;

    // Check if the passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Extract userId and token from query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const token = urlParams.get('token');

    const query = `
      mutation {
        updatePassword(userId: "${userId}", password: "${password}", confirmPassword: "${confirmPassword}") {
          message
        }
      }
    `;

    try {
      const response = await fetch("https://localhost:7111/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      if (result.data && result.data.updatePassword) {
        const message = result.data.updatePassword.message;
        toast.success(message);

        // Redirect after a short delay to allow the user to read the success message
        setTimeout(() => {
          this.props.navigate('/loginPage');
        }, 2000); // Adjust delay as needed (e.g., 2000ms = 2 seconds)
      } else if (result.errors) {
        toast.error("Error: " + result.errors[0].message);
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
    }
  }

  render() {
    return (
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <h3 className="text-center mb-4">Set New Password</h3>

                <form className="login-form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="New Password"
                      name="password"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group text-center">
                    <button
                      type="submit"
                      className="btn btn-primary rounded submit p-3 px-5"
                    >
                      Submit
                    </button>
                  </div>
                </form>

                {/* Toast container to show messages */}
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(NewPassword);
