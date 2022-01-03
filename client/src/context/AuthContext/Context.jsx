import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const LOGIN_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: false,
};

export const LoginContext = createContext(LOGIN_STATE);

export const LoginContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, LOGIN_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <LoginContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
