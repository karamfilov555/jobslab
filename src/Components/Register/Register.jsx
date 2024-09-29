import React, { Component } from "react";
import "./register.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Username: "",
      Password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Event For Input
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Event For Submit
  async handleSubmit(event) {
    event.preventDefault();

    const { Email, Username, Password } = this.state;

    // Define your GraphQL query or mutation
    const query = `
      mutation {
        login(email: "${Email}", username: "${Username}", password: "${Password}") {
          token
          user {
            id
            email
            username
          }
        }
      }
    `;

    try {
      // Send the request to the GraphQL API
      const response = await fetch("https://your-graphql-endpoint.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      if (result.data) {
        // Handle success (e.g., save token, redirect, etc.)
        console.log("Login successful:", result.data);
      } else if (result.errors) {
        // Handle errors (e.g., invalid credentials)
        console.error("Error logging in:", result.errors);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Network error:", error);
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
                <h3 className="text-center mb-4">Have an account?</h3>
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control rounded-left"
                      placeholder="Email"
                      name="Email"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Username"
                      name="Username"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group d-flex">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Password"
                      name="Password"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-50 text-md-left">
                      <a href={" "}>Forgot Password</a>
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary rounded submit p-3 px-5"
                    >
                      Get Started
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
