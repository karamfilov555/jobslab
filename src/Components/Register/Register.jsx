import React, { Component } from "react";
import { toast } from "react-toastify";
import { withRouter } from "./withRouter"; // Import the HOC
import "./register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      ConfirmPassword: "",
      isAgency: false, // New state for checkbox
      VAT: "", // New fields for agency
      PhoneNumber: "",
      ContactPerson: "",
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Event for Input
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Event for Checkbox
  handleCheckboxChange(event) {
    this.setState({ isAgency: event.target.checked });
  }

  // Event for Submit
  async handleSubmit(event) {
    event.preventDefault();

    const { Email, Password, ConfirmPassword, isAgency, VAT, PhoneNumber, ContactPerson } = this.state;

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
        confirmPassword: ConfirmPassword,
        isAgency: isAgency,
        vat: isAgency ? VAT : null,
        phoneNumber: isAgency ? PhoneNumber : null,
        contactPerson: isAgency ? ContactPerson : null,
      },
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

      if (result.data) {
        toast.success(result.data.register.message);
        if(result.data.isAgency)
        {
          this.setState({
            message: result.data.register.message,
          });
        }
        else
        {
        this.setState({
          message: result.data.register.message || "Registration successful!",
        });
      }
        this.props.navigate("/loginPage");
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
    const { isAgency, VAT, PhoneNumber, ContactPerson, message } = this.state;

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

                  <div className="form-group mb-4">
                    <input
                      type="checkbox"
                      id="isAgency"
                      name="isAgency"
                      checked={isAgency}
                      onChange={this.handleCheckboxChange}
                    />
                    <label htmlFor="isAgency" className="ms-2">
                      I am registering as an agency
                    </label>
                  </div>

                  {/* Conditionally render additional fields if isAgency is true */}
                  {isAgency && (
                    <>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          className="form-control rounded-left"
                          placeholder="VAT"
                          name="VAT"
                          value={VAT}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          className="form-control rounded-left"
                          placeholder="Phone Number"
                          name="PhoneNumber"
                          value={PhoneNumber}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          className="form-control rounded-left"
                          placeholder="Contact Person"
                          name="ContactPerson"
                          value={ContactPerson}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="form-group d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary rounded submit p-3 px-5"
                    >
                      Register
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
  }
}

export default withRouter(Register); // Wrap your component with HOC
