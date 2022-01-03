import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Topbar from "../../components/topbar/Topbar";
import { getBooks } from "../../context/Books/BookApiCall";
import { BookContext } from "../../context/Books/BookContext";

import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import SingleBook from "../../components/singleBook/SingleBook";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import "./books.css";

const Books = () => {
  const { books, loading, dispatch } = useContext(BookContext);
  const [categories, setCategories] = useState([]);

  // pgination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const history = useHistory();

  const fetchCategories = async () => {
    const { data } = await axios.get("http://localhost:5000/api/category");
    setCategories(data);
  };

  useEffect(() => {
    window.scroll(0, 0);
    getBooks(dispatch);
    fetchCategories();
  }, [dispatch]);

  // Pagination
  const filterCategories = categories.filter((category, i) => i < 6);

  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItems - itemsPerPage;

  const currentItems = books.slice(indexOfFirstItem, indexOfLastItems);

  // page number
  const pages = [];
  for (let i = 1; i <= Math.ceil(books.length / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <main>
      <Topbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container fluid="xl" className="my-4">
            <Row>
              <Col xl={2} className="categories-col">
                <h4 className="categories-header mb-3">Categories</h4>
                <ul className="categories-list">
                  {filterCategories.map((category) => {
                    return (
                      <li
                        onClick={() =>
                          history.push(`/categories/${category.title}`)
                        }
                        key={category._id}
                      >
                        {category.title}
                      </li>
                    );
                  })}
                </ul>
              </Col>
              <Col xl={10}>
                <div className="categories-page">
                  {currentItems.map((book) => {
                    return <SingleBook book={book} key={book._id} />;
                  })}
                </div>
              </Col>
            </Row>
            <Pagination
              pages={pages}
              content={books}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Container>
          <Footer />
        </>
      )}
    </main>
  );
};

export default Books;
