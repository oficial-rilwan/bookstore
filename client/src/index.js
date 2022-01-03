import React from "react";
import ReactDOM from "react-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { LoginContextProvider } from "./context/AuthContext/Context";
import { BookContextProvider } from "./context/Books/BookContext";
import { CartContextProvider } from "./context/CartContext/CartContext";

ReactDOM.render(
  <React.StrictMode>
    <LoginContextProvider>
      <BookContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </BookContextProvider>
    </LoginContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
