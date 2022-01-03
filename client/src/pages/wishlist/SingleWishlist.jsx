import React, { useContext, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../context/AuthContext/Context";
import "../../components/singleBook/singleBook.css";
import axios from "axios";

const SingleWishlist = ({ book }) => {
  const [removeLoading, setRemoveLoading] = useState(false);
  const { user, dispatch } = useContext(LoginContext);

  const history = useHistory();

  const removeFromWishlist = async () => {
    try {
      setRemoveLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/user/wishlists/remove/${book._id}`,
        { id: user._id }
      );
      res && dispatch({ type: "REMOVE_FROM_WISHLIST", payload: book._id });
      setRemoveLoading(false);
      window.location.reload();
    } catch (error) {
      setRemoveLoading(false);
      user && console.log(error?.response.data.error);
    }
  };

  return (
    <div key={book._id} className="categories-page-content">
      <div className="categories-page-wrapper">
        <div className="category-image-wrapper">
          <img
            className="category-page-image"
            src={book.image}
            alt={book.title}
            onClick={() => history.push(`/details/${book._id}`)}
          />
        </div>
        <div>
          <h4 onClick={() => history.push(`/details/${book._id}`)}>
            {book.title}
          </h4>
          <p>{book.author}</p>
          <h4>${book.price}</h4>
        </div>
      </div>
      <div>
        <button
          onClick={removeFromWishlist}
          className="link-button details-link"
        >
          {removeLoading && (
            <Spinner className="submit-loader" animation="border" size="sm" />
          )}
          REMOVE
        </button>

        <div className="product-divider"></div>
      </div>
    </div>
  );
};

export default SingleWishlist;
