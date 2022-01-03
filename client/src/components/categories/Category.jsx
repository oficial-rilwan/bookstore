import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getBooks } from "../../context/Books/BookApiCall";
import { BookContext } from "../../context/Books/BookContext";

import "./category.css";

const Category = () => {
  const { books, dispatch } = useContext(BookContext);

  useEffect(() => {
    getBooks(dispatch);
  }, [dispatch]);

  const getArtsBooks = books.filter((book) =>
    book.category.includes("Arts & Photography")
  );

  const biography = books.filter((book) =>
    book.category.includes("Biography & Memoir")
  );
  const business = books.filter((book) =>
    book.category.includes("Business & Investing")
  );

  return (
    <Container fluid="xl">
      <div className="categories-component">
        <div className="categories-header">
          <div>
            <h2>Arts & Photography</h2>
          </div>
          <div>
            <Link className="link-button" to={`/categories/Arts & Photography`}>
              view list ({getArtsBooks.length} books)
            </Link>
          </div>
        </div>
        <div className="category">
          {getArtsBooks.map((book) => {
            return (
              <Link to={`/details/${book._id}`} key={book._id}>
                <div className="cat-image-container">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="category-image"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Biographies */}
      <div className="categories-component">
        <div className="categories-header">
          <div>
            <h2>Biography & Memoir</h2>
          </div>
          <div>
            <Link className="link-button" to={`/categories/Biography & Memoir`}>
              view list ({biography.length} books)
            </Link>
          </div>
        </div>
        <div className="category">
          {biography.map((book) => {
            return (
              <Link to={`/details/${book._id}`} key={book._id}>
                <div className="cat-image-container">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="category-image"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Business */}
      <div className="categories-component">
        <div className="categories-header">
          <div>
            <h2>Business & Investing</h2>
          </div>
          <div>
            <Link
              className="link-button"
              to={`/categories/Business & Investing`}
            >
              view list ({business.length} books)
            </Link>
          </div>
        </div>
        <div className="category">
          {business.map((book) => {
            return (
              <Link to={`/details/${book._id}`} key={book._id}>
                <div className="cat-image-container">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="category-image"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Category;
