import React from "react";
import "./SuggestionBox.scss";
import ProductCard from "../ProductCards/ProductCard";

const SuggestionsBox = ({ suggestions, wishlist, handleAddToWishlist }) => {
  return (
    // The component's root element with the CSS class "suggestion-box".
    <div className="suggestion-box">
      <h2>Clothing Suggestions:</h2>

      <div className="card-container">
        {/* Mapping through each suggestion and rendering a ProductCard for each one. */}
        {suggestions.map((suggestion) => (
          <ProductCard
            // Assigning a unique key to each ProductCard based on the suggestion's ID.
            key={suggestion.id}
            // Passing the suggestion object as the 'product' prop to the ProductCard component.
            product={suggestion}
            // Checking if the current suggestion ID exists in the wishlist array and passing the result as 'isWishlist' prop.
            isWishlist={wishlist.includes(suggestion.id)}
            // Passing the 'handleAddToWishlist' callback function to the ProductCard component.
            handleAddToWishlist={handleAddToWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestionsBox;
