import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "../starRating/StarRating";

const SingleSimilar = ({ book }) => {
  const [rating] = useState(Math.floor(Math.random() * (6 - 3)) + 3);

  const handleReload = () => {
    window.setTimeout(() => {
      window.location.reload(true);
    }, 200);
  };
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div>
      <div className="similar-books" key={book._id}>
        <Link to={`/details/${book._id}`} onClick={handleReload}>
          <Row className="align-items-center ">
            <Col xs={3}>
              <div className="similar-book-image">
                <img src={book.image} alt={book.title} />
              </div>
            </Col>
            <Col>
              <div>
                <p className="similar-book-author">{book.author}</p>
                <p className="similar-book-title">{book.title}</p>

                <div className="d-flex align-items-center">
                  {Array(rating)
                    .fill()
                    .map((_, i) => (
                      <StarRating key={i} />
                    ))}
                </div>
              </div>
            </Col>
          </Row>
        </Link>
      </div>
    </div>
  );
};

export default SingleSimilar;
