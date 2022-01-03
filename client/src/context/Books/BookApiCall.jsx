import axios from "axios";

export const getBooks = async (dispatch) => {
  dispatch({ type: "GET_BOOKS_START" });
  try {
    const res = await axios.get("http://localhost:5000/api/books");
    dispatch({ type: "GET_BOOKS_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "GET_BOOKS_ERROR", payload: error.response.data });
  }
};
