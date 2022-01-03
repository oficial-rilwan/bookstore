import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const NotFound = () => {
  return (
    <div>
      <Container fluid="xl">
        <Row
          className="align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <Col className="text-center">
            <h1>Not Found 404</h1>
            <p>
              Return <Link to="/">Home</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;
