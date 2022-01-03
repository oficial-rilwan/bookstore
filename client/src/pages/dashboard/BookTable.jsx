import React from "react";
import { Container } from "react-bootstrap";

import "./dashboard.css";
import Dashmain from "./components/dashmain/Dashmain";
import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
const BookTable = () => {
  return (
    <div>
      <Topbar />
      <Container fluid="xl">
        <Dashmain />
      </Container>
      <Footer />
    </div>
  );
};

export default BookTable;
