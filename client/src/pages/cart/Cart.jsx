import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { DashLg, PlusLg, Trash } from "react-bootstrap-icons";
import { Link, useHistory } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import { CartContext } from "../../context/CartContext/CartContext";
import "./cart.css";
import { LoginContext } from "../../context/AuthContext/Context";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const { cart, dispatch } = useContext(CartContext);

  const { user } = useContext(LoginContext);

  const history = useHistory();

  // ///////////////////////////////////////////////
  // USE-EFFECT FUNCTIONS
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0).toFixed(2)
    );
    // eslint-disable-next-line
  }, [cart]);

  return (
    <>
      <Topbar />
      <main>
        <Container fluid="xl" className="my-4">
          <Row className="cart">
            <Col lg={9}>
              <div className="cart-card">
                {cart.map((item) => {
                  return (
                    <div className="desktop-cart" key={item._id}>
                      <Row className="cart-row justify-content-between align-items-center">
                        <Col>
                          <div className="cart-image">
                            <Link to={`/details/${item._id}`}>
                              <img src={item.image} alt={item.title} />
                            </Link>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="cart-content">
                            <h4 className="book-title">{item.title}</h4>
                            <p className="secondary-text">By {item.author}</p>
                            <p className="secondary-text">
                              Release Date:{" "}
                              {new Date(item.publishDate).toDateString()}
                            </p>
                            <div className="cart-button-group">
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "REMOVE_FROM_CART",
                                    payload: item,
                                  })
                                }
                                className="remove-item secondary-text"
                              >
                                <span className="cart-page-icon">
                                  <Trash />
                                </span>
                                REMOVE ITEM
                              </button>
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <div className="change-price-btn cart-price-change">
                            <div className="qty-btn-group">
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "CHANGE_CART_QUANTITY",
                                    payload: {
                                      _id: item._id,
                                      qty: item.qty - 1,
                                    },
                                  })
                                }
                                className="mobile-cart-increment primary-color"
                              >
                                <DashLg />
                              </button>
                              <span>{item.qty}</span>
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "CHANGE_CART_QUANTITY",
                                    payload: {
                                      _id: item._id,
                                      qty: item.qty + 1,
                                    },
                                  })
                                }
                                className="mobile-cart-increment primary-color"
                              >
                                <PlusLg />
                              </button>
                            </div>
                          </div>
                          <div className="quantity">
                            <p>(Note: {item.qty} Piece)</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </div>
            </Col>
            <Col lg={3}>
              <div className="total-card">
                <div>
                  <h2>Total</h2>

                  <div>
                    <p>The total amount (including VAT)</p>
                    <h3 className="total-price primary-color">${total}</h3>
                  </div>
                  {user ? (
                    <button disabled={total < 1} className="check-out-button">
                      GO TO CHECKOUT
                    </button>
                  ) : (
                    <button
                      onClick={() => history.push("/login")}
                      className="check-out-button"
                    >
                      GO TO CHECKOUT
                    </button>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          {/*///////////////////////////////// MOBILE CART/////////////////////////////////////// */}
          <Row className="mobile-cart">
            <Col xs={12}>
              {cart.map((item) => {
                return (
                  <div className="cart-row" key={item._id}>
                    <Row className="align-items-center ">
                      <Col xs={5}>
                        <Link to={`/details/${item._id}`}>
                          <img src={item.image} alt={item.title} />
                        </Link>
                      </Col>
                      <Col className="cart-content">
                        <h4 className="book-title">{item.title}</h4>
                        <p className="secondary-text">
                          By
                          <span> {item.author}</span>
                        </p>
                        <div className="price-container">
                          <h4>${item.price}</h4>
                          <div className="qty-btn-group">
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "CHANGE_CART_QUANTITY",
                                  payload: { _id: item._id, qty: item.qty - 1 },
                                })
                              }
                              className="mobile-cart-increment primary-color"
                            >
                              <DashLg />
                            </button>
                            <span>{item.qty}</span>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "CHANGE_CART_QUANTITY",
                                  payload: { _id: item._id, qty: item.qty + 1 },
                                })
                              }
                              className="mobile-cart-increment primary-color"
                            >
                              <PlusLg />
                            </button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </Col>
            <Col>
              <div className="total-card mt-5">
                <div>
                  <h2>Total</h2>
                  <div>
                    <p className="secondary-text">
                      The total amount (including VAT)
                    </p>
                    <h3 className="primary-color">${total}</h3>
                  </div>
                  {user ? (
                    <button disabled={total < 1} className="check-out-button">
                      GO TO CHECKOUT
                    </button>
                  ) : (
                    <button
                      onClick={() => history.push("/login")}
                      className="check-out-button"
                    >
                      GO TO CHECKOUT
                    </button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Cart;
