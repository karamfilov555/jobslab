// src/components/Login.jsx
import "./register.css";
import React, { Component } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import PhoneInput styles

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      ConfirmPassword: "",
      FirstName: "",
      LastName: "",
      phone: "",
      dropdownVisible: false, // Manage dropdown visibility
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }

  // Event For Input
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Event For Phone Input Change
  handlePhoneChange(phone) {
    this.setState({ phone, dropdownVisible: false }); // Hide dropdown when a phone number is selected
  }

  // Event For Submit
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fas fa-user"></span>
                </div>
                <h3 className="text-center mb-4">Register</h3>
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Email"
                      name="Username" // Changed to Username to match state
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <br />
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
                  <br />
                  <div className="form-group d-flex">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Confirm password"
                      name="ConfirmPassword" // Changed to ConfirmPassword to match state
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="form-group d-flex">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="First Name"
                      name="FirstName"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="form-group d-flex">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Last Name"
                      name="LastName"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="form-group d-flex">
                    <PhoneInput
                      className="form-control rounded-left"
                      country={"us"}
                      value={this.state.phone}
                      onChange={this.handlePhoneChange} // Use custom handler
                      inputStyle={{
                        width: '100%',
                        paddingLeft: '50px', // Increase left padding for visibility
                      }}
                      dropdownStyle={{
                        zIndex: 1000, // Ensure dropdown is on top of other elements
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary rounded submit p-3 px-5"
                    >
                      Register
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
