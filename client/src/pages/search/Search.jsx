import React, { useContext, useEffect } from "react";
import { BookContext } from "../../context/Books/BookContext";
import { Container } from "react-bootstrap";
import Topbar from "../../components/topbar/Topbar";
import { getBooks } from "../../context/Books/BookApiCall";
import { useLocation } from "react-router-dom";

import Loading from "../../components/loading/Loading";
import SingleBook from "../../components/singleBook/SingleBook";
import Footer from "../../components/footer/Footer";

const Books = () => {
  const { books, loading, dispatch } = useContext(BookContext);
  const q = new URLSearchParams(useLocation().search);
  const title = q.get("query");

  useEffect(() => {
    window.scroll(0, 0);
    getBooks(dispatch);
  }, [dispatch]);

  const filterBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(title.toLowerCase()) ||
      book.author.toLowerCase().includes(title.toLowerCase()) ||
      book.category.toLowerCase().includes(title.toLowerCase())
  );

  return (
    <div>
      <Topbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <main>
            <Container fluid="xl" className="my-4">
              <div>
                <h3> Results for "{title}"</h3>
                <h3 className="bold-h3 mb-3">
                  {filterBooks.length > 0
                    ? `Found (${filterBooks.length}) Items`
                    : "Check your spelling, or search for something else"}{" "}
                </h3>
              </div>
              <div className="categories-page">
                {filterBooks.map((book) => {
                  return <SingleBook book={book} key={book._id} />;
                })}
              </div>
            </Container>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Books;
