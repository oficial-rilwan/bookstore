const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_START":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        user: state.user,
        loading: false,
        error: true,
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        user: {
          ...state.user,
          wishlists: [...state.user.wishlists, action.payload],
        },
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        user: {
          ...state.user,
          wishlists: state.user.wishlists.filter(
            (wishes) => wishes !== action.payload
          ),
        },
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};
export default Reducer;
