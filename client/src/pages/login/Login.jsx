import React, { useContext, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { LoginCall } from "../../context/AuthContext/ApiCalls";
import { LoginContext } from "../../context/AuthContext/Context";

import "./login.css";
// IMAGE
import FormImg from "../../form-img.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const { user, loading, error, dispatch } = useContext(LoginContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginCall({ email: email, password: password }, dispatch);
    if (user) {
      history.push("/");
    }
  };

  return (
    <Container fluid="xl" className="my-5">
      <Row className="g-4 align-items-center justify-content-center auth-form-row">
        <Col md={6} lg={5}>
          <div>
            {error && !user && <Alert variant="danger"> {error.error}</Alert>}
          </div>
          <div>
            <h2 className="auth-form-header">Log in</h2>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="section-blue shipping street-address"
              />
            </div>

            <button type="submit" className="submit-button">
              {loading ? (
                <Spinner
                  className="submit-loader"
                  animation="border"
                  size="sm"
                />
              ) : (
                " Log in"
              )}
            </button>
          </form>
          <div className="alternative">
            <Link to="/login" className="primary-color auth-link">
              Forgot Password?
            </Link>
            <div className="auth-link-group">
              <p>Don't have an account?</p>
              <Link to="/register" className="primary-color auth-link">
                Sign up
              </Link>
            </div>
          </div>
        </Col>
        <Col lg={7} className="form-banner">
          <img src={FormImg} alt="form-banner" />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
