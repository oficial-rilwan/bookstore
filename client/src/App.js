import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginContext } from "./context/AuthContext/Context";
import BookDetails from "./pages/bookDetails/BookDetails";
import Search from "./pages/search/Search";
import Books from "./pages/books/Books";
import Cart from "./pages/cart/Cart";
import AddNewBook from "./pages/dashboard/AddNewBook";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import BookTable from "./pages/dashboard/BookTable";
import UpdateBook from "./pages/dashboard/UpdateBook";
import CategoriesPage from "./pages/categoriesPage/CategoriesPage";
import NotFound from "./pages/notFound/NotFound";
import Profile from "./pages/profile/Profile";
import Wishlist from "./pages/wishlist/Wishlist";

const App = () => {
  const { user } = useContext(LoginContext);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/books" component={Books} />
          <Route path="/cart" component={Cart} />
          <Route path="/search" component={Search} />
          <Route path="/categories/:title" component={CategoriesPage} />
          <Route path="/details/:id" component={BookDetails} />
          <Route path="/profile/:id" component={user ? Profile : Home} />
          <Route path="/wishlist/:id" component={user ? Wishlist : Home} />
          <Route path="/login" component={!user ? Login : Home} />
          <Route path="/register" component={!user ? Register : Home} />
          <Route
            exact
            path="/dashboard"
            component={user && user.isAdmin ? Dashboard : Home}
          />
          <Route
            path="/dashboard/addnewbook"
            component={user && user.isAdmin ? AddNewBook : Home}
          />
          <Route
            path="/dashboard/bookstable"
            component={user && user.isAdmin ? BookTable : Home}
          />
          <Route
            path="/dashboard/update/:id"
            component={user && user.isAdmin ? UpdateBook : Home}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
