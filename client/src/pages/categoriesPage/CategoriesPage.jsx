import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import SingleBook from "../../components/singleBook/SingleBook";
import Topbar from "../../components/topbar/Topbar";
import { getBooks } from "../../context/Books/BookApiCall";
import { BookContext } from "../../context/Books/BookContext";

const CategoriesPage = () => {
  const { title } = useParams();

  const { books, dispatch, loading } = useContext(BookContext);

  useEffect(() => {
    window.scroll(0, 0);
    getBooks(dispatch);
  }, [dispatch]);

  const filterCategories = books.filter((book) =>
    book.category.includes(title)
  );
  return (
    <>
      <Topbar />
      <Container fluid="xl" className="my-4">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h3 className="bold-h3 mb-3">{title}</h3>
            <main className="categories-page">
              {filterCategories.map((book) => {
                return <SingleBook book={book} key={book._id} />;
              })}
            </main>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default CategoriesPage;
