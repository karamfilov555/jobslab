import React, { Component } from "react";
import { withRouter } from './withRouter'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
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
    const { Email, Password } = this.state;

    const query = `
      mutation Login($email: String!, $password: String!) {
        login(input: { email: $email, password: $password }) {
          message
        }
      }
    `;

    const variables = {
      email: Email,
      password: Password,
    };

    try {
      const response = await fetch("https://localhost:7111/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.data && result.data.login) {
        const message = result.data.login.message;

        if (message === "Login successful!") {
          localStorage.setItem("token", message);
          toast.success("Login successful!");
          this.props.navigate('/profilePage');
        } else {
          toast.error("Incorrect credentials, please try again.");
        }
      } else if (result.errors) {
        const errorMessage = result.errors.map(err => err.message).join(", ");
        toast.error("Error: " + errorMessage);
        this.setState({
          message: "Error: " + errorMessage,
        });
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
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
                <p className="text-center">
                  To register your free account <Link to="/registerPage"><strong>click here</strong></Link>!
                </p>

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
                      <Link to="/resetPasswordPage" className="forgot-password-link">Forgot Password?</Link>
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

export default withRouter(Login);
