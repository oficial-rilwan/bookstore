import React from "react";
import {
  BarChartLine,
  House,
  Person,
  Book,
  PlusCircle,
  ExclamationCircleFill,
} from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const history = useHistory();
  return (
    <div className="mt-3 dashboard-sidebar">
      <div className="dash-list-group">
        <p>Dashboard</p>
        <ul>
          <li onClick={() => history.push("/dashboard")}>
            <span>
              <House className="dash-icon" />
            </span>
            Home
          </li>
          <li>
            <span>
              <Person className="dash-icon" />
            </span>
            Users
          </li>
          <li onClick={() => history.push("/dashboard/bookstable")}>
            <span>
              <Book className="post-icon" />
            </span>
            Books
          </li>
        </ul>
      </div>
      <div className="dash-list-group">
        <p>Quick Menu</p>
        <ul>
          <li onClick={() => history.push("/dashboard/addnewbook")}>
            <span>
              <PlusCircle className="dash-icon" />
            </span>
            Add New Book
          </li>
          <li>
            <span>
              <BarChartLine className="analytics" />
            </span>
            Analytics
          </li>
          <li>
            <span>
              <ExclamationCircleFill className="dash-icon" />
            </span>
            Reports
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
