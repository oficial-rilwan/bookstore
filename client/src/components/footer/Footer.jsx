import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";
import "./footer.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="footer py-5">
      <Container fluid="xl">
        <div className="footer-nav">
          <h3>Bookstore</h3>
        </div>
        <Row>
          <Col lg={6}>
            <p>
              Bookstore is an all in one stop to fulfill all your reading needs.
              We're small team of book lovers who are devoted to helping you ge
              the most out of life.
            </p>
          </Col>
        </Row>
        <div className="social">
          <a
            rel="noreferrer"
            href="https://web.facebook.com/rilwan.aribidesi/"
            target="_blank"
          >
            <Facebook className="footer-social-icon" />
          </a>
          <a
            rel="noreferrer"
            href="https://www.instagram.com/rilwanbiodun/"
            target="_blank"
          >
            <Instagram className="footer-social-icon" />
          </a>
          <a
            rel="noreferrer"
            href="https://www.linkedin.com/in/rilwan-aribidesi-a704b31b1/"
            target="_blank"
          >
            <Linkedin className="footer-social-icon" />
          </a>
        </div>
        <p>Copyright {year}. All Rights Reserved</p>
      </Container>
    </div>
  );
};

export default Footer;
