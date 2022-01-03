import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import "./dashmain.css";

const Dashmain = () => {
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBooks = async () => {
    setLoading(true);
    const { data } = await axios.get("http://localhost:5000/api/books");
    setBooks(data);
    setLoading(false);
  };

  useEffect(() => {
    getBooks();
  }, []);
  return (
    <div className="all-books-dash">
      {loading ? (
        <Loading />
      ) : (
        <Container fluid>
          <Row>
            <Col>
              <div className="mt-3 dash-users">
                <h3>All Posts</h3>
                <Row className="mb-3">
                  <Col xs={2} className="bold">
                    #ID
                  </Col>
                  <Col xs={6} className="bold">
                    Post
                  </Col>
                  <Col xs={2} className="bold">
                    Date
                  </Col>
                  <Col xs={2} className="bold">
                    Actions
                  </Col>
                </Row>
                {books.map((p) => {
                  return (
                    <Row key={p._id} className="dash-post-wrapper">
                      <Col xs={2}>
                        <div
                          className="dash-post-id"
                          onClick={() => history.push(`/details/${p._id}`)}
                        >
                          <p>#{p._id}</p>
                        </div>
                      </Col>
                      <Col
                        xs={6}
                        onClick={() => history.push(`/details/${p._id}`)}
                      >
                        <div className="dash-post-info">
                          <img src={p.image} alt="banner" />
                          <p>{p.title}</p>
                        </div>
                      </Col>
                      <Col xs={2}>
                        <div className="dash-post-info">
                          <span>{new Date(p.publishDate).toDateString()}</span>
                        </div>
                      </Col>
                      <Col xs={2}>
                        <div className="dash-post-actions">
                          <span
                            onClick={() =>
                              history.push(`/dashboard/update/${p._id}`)
                            }
                            className="edit-post"
                          >
                            <PencilSquare />
                          </span>{" "}
                          <span className="delete-post">
                            <Trash />
                          </span>
                        </div>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Dashmain;
