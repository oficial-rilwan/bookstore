import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../context/CartContext/CartContext";
import "./singleBook.css";

const SingleBook = ({ book }) => {
  const history = useHistory();
  const { cart, dispatch } = useContext(CartContext);
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
        {cart.some((item) => item._id === book._id) ? (
          <button
            onClick={() =>
              dispatch({ type: "REMOVE_FROM_CART", payload: book })
            }
            className="link-button details-link"
          >
            REMOVE FROM CART
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: book })}
            className="link-button "
          >
            ADD TO CART
          </button>
        )}

        <div className="product-divider"></div>
      </div>
    </div>
  );
};

export default SingleBook;
