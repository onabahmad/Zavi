import React from "react";
import "./SearchForm.scss";

// - searchTerm: the current search term
// - handleSearchChange: a function to handle changes in the search input
// - handleSearchSubmit: a function to handle form submission (when Enter is pressed)
const SearchForm = ({ searchTerm, handleSearchChange, handleSearchSubmit }) => {
  return (
    <form className="Form" onSubmit={handleSearchSubmit}>
      <input
        className="search__bar"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        onClick={handleSearchChange}
      />
    </form>
  );
};

export default SearchForm;
