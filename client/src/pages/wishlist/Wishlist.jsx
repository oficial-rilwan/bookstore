import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import Topbar from "../../components/topbar/Topbar";
import SingleWishlist from "./SingleWishlist";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const getWishes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/user/wishlists/${id}`
      );
      setWishlist(data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  useEffect(() => {
    getWishes();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Topbar />
      {loading ? (
        <Loading />
      ) : (
        <Container fluid="xl">
          {error && <Alert variant="danger"> {error}</Alert>}
          <main className="mb-5">
            {wishlist.length < 1 && !loading ? (
              <h4>Wishlists is currently empty</h4>
            ) : (
              <>
                <h3 className="bold-h3 mb-3">Wishlists</h3>
                <div className="categories-page">
                  {wishlist.map((book) => {
                    return <SingleWishlist book={book} key={book._id} />;
                  })}
                </div>
              </>
            )}
          </main>
        </Container>
      )}
      <Footer />
    </div>
  );
};

export default Wishlist;
