const BookReducer = (state, action) => {
  switch (action.type) {
    case "GET_BOOKS_START":
      return {
        books: [],
        loading: true,
        error: false,
      };
    case "GET_BOOKS_SUCCESS":
      return {
        books: action.payload,
        loading: false,
        error: false,
      };
    case "GET_BOOKS_ERROR":
      return {
        books: [],
        loading: false,
        error: true,
      };
    default:
      return { ...state };
  }
};
export default BookReducer;
