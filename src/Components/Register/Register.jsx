import React, { Component } from "react";
import { withRouter } from "./withRouter"; // Import the HOC
import "./register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      ConfirmPassword: "", // New state for confirm password
      message: "", // State to hold the message
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Event for Input
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Event for Submit
  async handleSubmit(event) {
    event.preventDefault();

    const { Email, Password, ConfirmPassword } = this.state;

    // Check if password and confirm password match
    if (Password !== ConfirmPassword) {
      this.setState({
        message: "Passwords do not match!",
      });
      return;
    }

    // Define your GraphQL mutation with variables
    const query = `
      mutation Register($input: RegisterInput!) {
        register(input: $input) {
          message
        }
      }
    `;

    // Define the variables for the GraphQL mutation
    const variables = {
      input: {
        email: Email,
        password: Password,
        confirmPassword: ConfirmPassword,  // Include confirmPassword in the input
      },
    };

    try {
      // Send the request to the GraphQL API
      const response = await fetch("https://localhost:7111/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.data) {
        // Set success message in state
        this.setState({
          message: result.data.register.message || "Registration successful!",
        });

        // After successful registration, redirect to another page
        this.props.navigate("/jobListPage");
      } else if (result.errors) {
        // Set error message in state
        this.setState({
          message: "Error: " + result.errors[0].message,
        });
      }
    } catch (error) {
      // Handle network or other errors
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
                  <span className="fas fa-user"></span>
                </div>
                <h3 className="text-center mb-4">Create account</h3>
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <div className="form-group mb-4">
                    <input
                      type="email"
                      className="form-control rounded-left"
                      placeholder="Email"
                      name="Email"
                      value={this.state.Email}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Password"
                      name="Password"
                      value={this.state.Password}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Confirm Password"
                      name="ConfirmPassword"
                      value={this.state.ConfirmPassword}
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <div className="form-group d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary rounded submit p-3 px-5"
                    >
                      Register
                    </button>
                  </div>
                </form>
                {/* Display the message */}
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

export default withRouter(Register); // Wrap your component with HOC
