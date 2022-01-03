import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import "./register.css";

// IMAGE
import FormImg from "../../form-img.svg";
import { useEffect } from "react";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validating userInputs
  const [usernameMessage] = useState(
    "Username should be 3-16 characters and shouldn't include any special character!"
  );
  const [emailMessage] = useState("It should be a valid email address!");
  const [passwordMessage] = useState(
    "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
  );
  const [confirmPasswordMessage] = useState("Passwords don't match!");

  const [focused, setFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };
  const handleLastNameFocus = (e) => {
    setLastNameFocused(true);
  };
  const handleEmailFocus = (e) => {
    setEmailFocused(true);
  };
  const handlePasswordFocus = (e) => {
    setPasswordFocused(true);
  };
  const handleConfirmPasswordFocus = (e) => {
    setConfirmPasswordFocused(true);
  };

  // Submit user credentials
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
    } else {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      try {
        setLoading(true);
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          user
        );
        setLoading(false);
        res && history.push("/login");
      } catch (error) {
        setErrorMessage(error.response.data.error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <Container fluid="xl" className="my-5">
      <Row className="g-4 align-items-center justify-content-center">
        <Col md={6} lg={5}>
          <div className="title-header">
            <h2 className="auth-form-header">Sign up</h2>
          </div>
          <div>
            {errorMessage && <Alert variant="danger"> {errorMessage}</Alert>}
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                required
                pattern="^[A-Za-z0-9]{3,16}$"
                onBlur={handleFocus}
                focused={focused.toString()}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <span className="error-message">{usernameMessage}</span>
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                required
                pattern="^[A-Za-z0-9]{3,16}$"
                onBlur={handleLastNameFocus}
                focused={lastNameFocused.toString()}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <span className="error-message">{usernameMessage}</span>
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                required
                onBlur={handleEmailFocus}
                focused={emailFocused.toString()}
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="error-message">{emailMessage}</span>
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="at least 8 characters"
                required
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                onBlur={handlePasswordFocus}
                focused={passwordFocused.toString()}
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="error-message">{passwordMessage}</span>
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                pattern={password}
                onBlur={handleConfirmPasswordFocus}
                focused={confirmPasswordFocused.toString()}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="current-password"
              />
              <span className="error-message">{confirmPasswordMessage}</span>
            </div>

            <div className="auth-terms">
              <input type="checkbox" className="check-box" />
              <p>
                I agree with{" "}
                <Link to="/" className="auth-link">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/" className="auth-link">
                  Privacy
                </Link>
              </p>
            </div>
            <button type="submit" className="submit-button">
              {loading && (
                <Spinner
                  className="submit-loader"
                  animation="border"
                  size="sm"
                />
              )}
              Sign up
            </button>
          </form>
          <div className="auth-link-group">
            <p>Already have an account?</p>
            <Link to="/login" className="primary-color auth-link">
              Login
            </Link>
          </div>
        </Col>
        <Col lg={7} className="form-banner">
          <img src={FormImg} alt="form-banner" />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
