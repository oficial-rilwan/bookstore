import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import "./bookdetails.css";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import { CartContext } from "../../context/CartContext/CartContext";
import Loading from "../../components/loading/Loading";
import SimilarBooks from "../../components/similarBooks/SimilarBooks";
import Footer from "../../components/footer/Footer";
import { LoginContext } from "../../context/AuthContext/Context";

const BookDetails = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const history = useHistory();

  const { id } = useParams();

  const { cart, dispatch } = useContext(CartContext);
  const { user, dispatch: userDispatch } = useContext(LoginContext);

  const fetchSingleBook = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/books/find?bookId=${id}`
      );
      setLoading(false);
      setContent(data);
    } catch (error) {
      setError(error.response.data.error);
      console.log(error.response.data);
      setLoading(false);
    }
  };

  const addToWishlists = async () => {
    try {
      setAddLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/user/wishlists/${id}`,
        { id: user._id }
      );
      res && userDispatch({ type: "ADD_TO_WISHLIST", payload: id });
      setAddLoading(false);
    } catch (error) {
      setAddLoading(false);
      user && console.log(error.response.data.error);
    }
  };

  const removeFromWishlist = async () => {
    try {
      setRemoveLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/user/wishlists/remove/${id}`,
        { id: user._id }
      );
      res && userDispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
      setRemoveLoading(false);
    } catch (error) {
      setRemoveLoading(false);
      user && console.log(error?.response.data.error);
    }
  };

  useEffect(() => {
    fetchSingleBook();
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <main>
      <>
        <Topbar />
        {loading ? (
          <Loading />
        ) : (
          <Container fluid="xl">
            <h3 className="bold-h3 mb-3">Book Details</h3>
            <Row className="g-4 details-row">
              <Col lg={9}>
                <Row className="align-items-center">
                  <Col lg={4}>
                    <div className="details-image">
                      <img src={content.image} alt={content.title} />
                    </div>
                  </Col>
                  <Col lg={8} className="details-content">
                    {error && <Alert variant="danger"> {error}</Alert>}

                    <h3 className="content-title">{content.title}</h3>
                    <p>{content.author}</p>
                    <h3>${content.price}</h3>
                    <div className="details-button-group">
                      <>
                        {cart.some((item) => item._id === content._id) ? (
                          <button
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: content,
                              })
                            }
                            className="link-button details-link"
                          >
                            remove from cart
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              dispatch({
                                type: "ADD_TO_CART",
                                payload: content,
                              })
                            }
                            className="link-button"
                          >
                            add to cart
                          </button>
                        )}
                      </>
                      {user ? (
                        <>
                          {user.wishlists.some((item) => item === id) ? (
                            <button
                              onClick={removeFromWishlist}
                              className="link-button details-link"
                            >
                              {removeLoading && (
                                <Spinner
                                  className="submit-loader"
                                  animation="border"
                                  size="sm"
                                />
                              )}
                              remove from wishlists
                            </button>
                          ) : (
                            <button
                              onClick={addToWishlists}
                              className="link-button "
                            >
                              {addLoading && (
                                <Spinner
                                  className="submit-loader"
                                  animation="border"
                                  size="sm"
                                />
                              )}
                              add to wishlists
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => history.push("/login")}
                          className="link-button"
                        >
                          add to wishlists
                        </button>
                      )}
                    </div>
                  </Col>

                  <Row className="mt-5">
                    <h3 className="bold-h3">Description</h3>
                    <p className="description">{content.description}</p>
                  </Row>
                  <Row className="mt-2 content-details">
                    <Col lg={6}>
                      <h3 className="bold-h3">Details</h3>
                      <Row>
                        <Col sm={12} md={6} className="content-details-row">
                          <p>Paperback</p> <h4>{content.pages}</h4>
                        </Col>
                        <Col sm={12} md={6} className="content-details-row">
                          <p>Language</p> <h4>{content.language}</h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12} md={6} className="content-details-row">
                          <p>Publisher</p> <h4>{content.publisher}</h4>
                        </Col>
                        <Col sm={12} md={6} className="content-details-row">
                          <p>Dimensions</p> <h4>{content.dimensions}</h4>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mt-2 mb-5">
                    <h3 className="bold-h3">About Author</h3>
                    <p className="about-author">{content.aboutAuthor}</p>
                  </Row>
                </Row>
              </Col>
              <Col lg={3}>
                <SimilarBooks content={content} />
              </Col>
            </Row>
          </Container>
        )}
        <Footer />
      </>
    </main>
  );
};

export default BookDetails;
