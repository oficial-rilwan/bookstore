import React, { useContext, useEffect } from "react";
import { getBooks } from "../../context/Books/BookApiCall";
import { BookContext } from "../../context/Books/BookContext";
import "./similarBooks.css";
import SingleSimilar from "./SingleSimilar";

const SimilarBooks = ({ content }) => {
  const { books, dispatch } = useContext(BookContext);

  useEffect(() => {
    getBooks(dispatch);
  }, [dispatch]);

  const filterSimilarBooks = books
    .filter((book) => book.category === content.category)
    .filter((book) => book.title !== content.title);

  return (
    <div className="mb-5">
      <h4 className="primary-color">Similar Books</h4>
      {filterSimilarBooks.map((book) => {
        return <SingleSimilar key={book._id} book={book} />;
      })}
    </div>
  );
};

export default SimilarBooks;
