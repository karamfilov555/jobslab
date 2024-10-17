import "./login.css"; // Assuming you have a similar CSS file for styles
import React, { Component } from "react";
import { withRouter } from './withRouter'; // Adjust the import path as necessary
import { Link } from 'react-router-dom'; // Import Link if using react-router

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
      mutation {
        token(username: "${Email}", password: "${Password}") {
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

      if (result.data) {
        const token = result.data.token.message;
        localStorage.setItem("token", token);
        this.props.navigate('/profilePage');
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
                  <span className="fas fa-user"></span>
                </div>
                <h3 className="text-center mb-4">Log In</h3>
                
                {/* Registration message with bold text */}
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
                      <a href="#">Forgot Password?</a>
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
