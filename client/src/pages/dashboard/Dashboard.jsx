import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Topbar from "../../components/topbar/Topbar";
import Dashmain from "./components/dashmain/Dashmain";
import Sidebar from "./components/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <Topbar />
      <Container fluid="xl">
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>
          <Col lg={9}>
            <Dashmain />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Dashboard;
