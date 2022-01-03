import React from "react";
import { Spinner } from "react-bootstrap";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <Spinner
        animation="border"
        style={{ width: "50px", height: "50px", color: "black" }}
      />
    </div>
  );
};

export default Loading;
