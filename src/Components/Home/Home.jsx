import React, { useState, useRef } from "react";
import { faker } from "@faker-js/faker";

import SearchForm from "../SearchForm.jsx/SearchForm";
import SuggestionBox from "../SuggestionBox/SuggestionBox";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [wishlist, setWishlist] = useState([]); //

  // Function to generate fake suggestions based on the provided filter term.
  const generateSuggestions = (filterTerm) => {
    const suggestionsList = Array.from({ length: 5 }, () => ({
      id: faker.datatype.uuid(), // Generating a fake UUID for the suggestion.
      name: faker.commerce.productName(), // Generating a fake product name.
      price: faker.commerce.price(), // Generating a fake product price.
      image: faker.image.people(1234, 2345, true), // Generating a fake product image.
    }));

    // Filtering the suggestions based on the filter term.
    const filteredSuggestions = suggestionsList.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
        suggestion.price.includes(filterTerm)
    );

    setSuggestions(filteredSuggestions); // Updating the state with the filtered suggestions.
  };

  // Handler for when the search input value changes.
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value); // Updating the 'searchTerm' state with the new value.
    generateSuggestions(value); // Generating new suggestions based on the updated search term.
  };

  // Handler for when the search form is submitted.
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    alert(`Searching for: ${searchTerm}`); // Showing an alert with the current search term.
    setSearchTerm(""); // Clearing the search term state.
    setSuggestions([]); // Clearing the suggestions state.
  };

  // Handler for adding/removing a product to/from the wishlist.
  const handleAddToWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        // If the product is already in the wishlist, remove it.
        return prevWishlist.filter((id) => id !== productId);
      } else {
        // If the product is not in the wishlist, add it.
        return [...prevWishlist, productId];
      }
    });
  };

  // Function to render a message when there are no matching suggestions.
  const renderNoMatchingSuggestions = () => {
    if (searchTerm && suggestions.length === 0) {
      return <p>No matching suggestions found, try something else.</p>;
    }
    return null;
  };

  return (
    <div className="Home">
      <SearchForm
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />
      {renderNoMatchingSuggestions()}
      {suggestions.length > 0 && (
        <SuggestionBox
          suggestions={suggestions}
          wishlist={wishlist}
          handleAddToWishlist={handleAddToWishlist}
        />
      )}
    </div>
  );
};

export default Home;
