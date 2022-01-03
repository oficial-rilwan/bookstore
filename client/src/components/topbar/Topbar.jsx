import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Bookmark,
  BoxArrowInLeft,
  Cart,
  Gear,
  Person,
  PersonRolodex,
} from "react-bootstrap-icons";
import { Badge, Container } from "react-bootstrap";
import "./topbar.css";
import { LoginContext } from "../../context/AuthContext/Context";
import { CartContext } from "../../context/CartContext/CartContext";
import SearchBar from "../search/SearchBar";

const Topbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const { user, dispatch } = useContext(LoginContext);

  const { cart } = useContext(CartContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.reload();
  };

  return (
    <header className="navbar-header">
      <Container fluid="xl">
        <nav className="nav-bar">
          <div onClick={() => history.push("/")}>
            <h3 className="logo">Book Store</h3>
          </div>

          <SearchBar />

          <ul className="top-bar-list">
            <li>
              <Link to="/cart" className="cart-link">
                <Cart className="shopping-cart" />
                <Badge pill className="qty-badge primary-color-bg">
                  {cart.length}
                </Badge>
              </Link>
            </li>
            <li>
              {user ? (
                <img
                  onClick={() => setShowMenu(!showMenu ? true : false)}
                  src={
                    user.image
                      ? user.image
                      : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  }
                  alt="profile"
                  className="profile-image"
                />
              ) : (
                <Link to="/login" className="cart-link">
                  <Person className="user-login" />
                </Link>
              )}
            </li>
          </ul>
          <div className={!showMenu ? "mobile-menu" : "mobile-menu show"}>
            <ul>
              {user && (
                <li onClick={() => history.push(`/wishlist/${user._id}`)}>
                  <Bookmark className="mobile-menu-icon" /> Wishlists
                </li>
              )}
              <li onClick={() => history.push(`/profile/${user._id}`)}>
                {" "}
                <Gear className="mobile-menu-icon" /> Settings
              </li>
              {user && user.isAdmin && (
                <li onClick={() => history.push("/dashboard")}>
                  <PersonRolodex className="mobile-menu-icon" /> Dashboard
                </li>
              )}
              <li onClick={handleLogout}>
                {" "}
                <BoxArrowInLeft className="mobile-menu-icon" /> Logout
              </li>
            </ul>
          </div>
        </nav>
      </Container>

      {/* Mobile Nav */}

      <Container fluid="xl">
        <nav className="mobile-nav">
          <div className="mobile-nav-group">
            <div className="mobile-nav-content">
              {/* <List className="menu-icon" /> */}
              <div
                className="mobile-nav-logo"
                onClick={() => history.push("/")}
              >
                <h3 className="logo">Book Store</h3>
              </div>
            </div>

            <ul className="mobile-nav-top-bar-list">
              <li>
                <Link to="/cart" className="cart-link">
                  <Cart className="shopping-cart" />
                  <Badge pill className="qty-badge primary-color-bg">
                    {cart.length}
                  </Badge>
                </Link>
              </li>
              <li>
                {user ? (
                  <img
                    onClick={() => setShowMenu(!showMenu ? true : false)}
                    src={
                      user.image
                        ? user.image
                        : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    }
                    alt="profile"
                    className="profile-image"
                  />
                ) : (
                  <Link to="/login" className="cart-link">
                    <Person className="user-login" />{" "}
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <div className={!showMenu ? "mobile-menu" : "mobile-menu show"}>
            <ul>
              {user && (
                <li onClick={() => history.push(`/wishlist/${user._id}`)}>
                  <Bookmark className="mobile-menu-icon" /> Wishlists
                </li>
              )}
              <li onClick={() => history.push(`/profile/${user._id}`)}>
                {" "}
                <Gear className="mobile-menu-icon" /> Settings
              </li>
              {user && user.isAdmin && (
                <li onClick={() => history.push("/dashboard")}>
                  <PersonRolodex className="mobile-menu-icon" /> Dashboard
                </li>
              )}
              <li onClick={handleLogout}>
                {" "}
                <BoxArrowInLeft className="mobile-menu-icon" /> Logout
              </li>
            </ul>
          </div>
          <SearchBar />
        </nav>
      </Container>
    </header>
  );
};

export default Topbar;
