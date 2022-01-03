import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import "./searchbar.css";

const SearchBar = () => {
  const [title, setTitle] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Please enter a valid input");
    } else {
      history.push(`/search?query=${title}`);
    }
    setTitle("");
  };
  useEffect(() => {}, [title]);
  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search books, authors, categories..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="search-button">
          <Search />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
