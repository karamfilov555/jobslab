import "./login.css"; // Assuming you have a similar CSS file for styles
import React, { Component } from "react";
import { withRouter } from './withRouter'; // Adjust the import path as necessary

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "", // Changed from Username to Email
      Password: "",
      message: "", // State to hold message feedback
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Event for input changes
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Event for form submission
  async handleSubmit(event) {
    event.preventDefault();
    const { Email, Password } = this.state;

    // Your GraphQL mutation
    const query = `
      mutation {
        token(username: "${Email}", password: "${Password}") {
          message
        }
      }
    `;

    try {
      // Send the request to the GraphQL API
      const response = await fetch("https://localhost:7111/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      // Check for errors or successful response
      if (result.data) {
        const token = result.data.token.message; // Adjust according to your response structure
        // Store the token in local storage (or session storage or cookies)
        localStorage.setItem("token", token); // Using local storage

        // Navigate to the homepage after successful login
        this.props.navigate('/jobListPage'); // Change '/' to the desired route if needed

      } else if (result.errors) {
        // Handle errors
        this.setState({
          message: "Error: " + result.errors[0].message,
        });
      }
    } catch (error) {
      // Handle network errors
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
                <h3 className="text-center mb-4">Log In</h3>
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email" // Change input type to email
                      className="form-control rounded-left"
                      placeholder="Email"
                      name="Email" // Changed from Username to Email
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
                  <div className="form-group d-md-flex justify-content-center">
                    <div className="w-100 text-center">
                      <a href={" "}>Forgot Password?</a>
                    </div>
                  </div>
                  <div className="form-group text-center"> {/* Centering the button */}
                    <button
                      type="submit"
                      className="btn btn-primary rounded submit p-3 px-5"
                    >
                      Log In
                    </button>
                  </div>
                </form>
                {/* Display feedback message */}
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

// Wrap the component with withRouter HOC to access the navigate function
export default withRouter(Login);
