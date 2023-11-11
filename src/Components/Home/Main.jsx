import React, { useState, useRef } from "react";
import { faker } from "@faker-js/faker";
import "./Main.scss";

import SearchForm from "../SearchForm.jsx/SearchForm";
import SuggestionBox from "../SuggestionBox/SuggestionBox";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const hasGeneratedSuggestions = useRef(false);
  const originalSuggestions = useRef([]);

  const generateSuggestions = (filterTerm) => {
    if (!hasGeneratedSuggestions.current) {
      const suggestionsList = Array.from({ length: 150 }, () => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.people(1234, 2345, true),
      }));

      setSuggestions(suggestionsList);
      originalSuggestions.current = suggestionsList;
      hasGeneratedSuggestions.current = true;
    } else {
      const filteredSuggestions = originalSuggestions.current.filter(
        (suggestion) =>
          suggestion.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
          suggestion.price.includes(filterTerm)
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    generateSuggestions(value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    alert(`Searching for: ${searchTerm}`);
    setSearchTerm("");
    // Do not clear suggestions to keep the filtered results visible.
  };

  const handleAddToWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const renderNoMatchingSuggestions = () => {
    if (searchTerm && suggestions.length === 0) {
      return (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          No matching suggestions found, Try something else.
        </p>
      );
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

export default Main;
