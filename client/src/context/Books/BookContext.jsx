import { createContext, useReducer } from "react";
import BookReducer from "./BookReducer";

const BOOK_STATE = {
  books: [],
  loading: true,
  error: false,
};

export const BookContext = createContext(BOOK_STATE);

export const BookContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BookReducer, BOOK_STATE);
  return (
    <BookContext.Provider
      value={{
        books: state.books,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
