import "./login.css"; // Reuse the same styles for consistency
import React, { Component } from "react";
import { withRouter } from './withRouter'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      message: "",
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
    const { Email } = this.state;

    const query = `
      mutation {
        resetPassword(email: "${Email}") {
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

      // Clear the message state first
      this.setState({ message: "" });

      if (result.data && result.data.resetPassword) {
        const message = result.data.resetPassword.message; // Ensure you're accessing the correct field
        this.setState({
          message: message,
        });
      } else if (result.errors) {
        this.setState({
          message: "Error: " + result.errors[0].message,
        });
      }
    } catch (error) {
      this.setState({
        message: "Network error: " + error.message,
      });
    }
  }

  render() {
    return (
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fas fa-key"></span>
                </div>
                <h3 className="text-center mb-4">Forgot Password</h3>
                
                {/* Back to login link */}
                <p className="text-center">
                  Remembered your password? <Link to="/loginPage"><strong>Log in here</strong></Link>
                </p>

                <form className="login-form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control rounded-left"
                      placeholder="Enter your email"
                      name="Email"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group text-center">
                    <button
                      type="submit"
                      className="btn btn-primary rounded submit p-3 px-5"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>

                {this.state.message && (
                  <div className="alert alert-info mt-3">
                    {this.state.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(ForgotPassword);
