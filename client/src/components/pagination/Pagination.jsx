import React, { useState } from "react";
import { ChevronDoubleLeft, ChevronDoubleRight } from "react-bootstrap-icons";
import "./pagination.css";

const Pagination = ({ pages, content, currentPage, setCurrentPage }) => {
  // page numbers slicing
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // handle click for Number of page
  const handleClick = (e) => {
    window.scroll(0, 0);
    setCurrentPage(Number(e.target.id));
  };

  // Page numbers rendering
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          className={currentPage === number ? "active" : null}
          key={number}
          id={number}
          onClick={handleClick}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  // handle next and previous button
  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>;
  }
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevBtn}>&hellip;</li>;
  }
  return (
    <div>
      {content.length > 1 && (
        <ul className="page-number">
          <button
            className="nextprev"
            onClick={handlePrevBtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            <ChevronDoubleLeft />
          </button>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          <button
            className="nextprev"
            onClick={handleNextBtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            <ChevronDoubleRight />
          </button>
        </ul>
      )}
    </div>
  );
};

export default Pagination;
