import React from "react";
import "./ProductCard.scss";

// ProductCard component receives props 'product', 'isWishlist', and 'handleAddToWishlist'
const ProductCard = ({ product, isWishlist, handleAddToWishlist }) => {
  return (
    // The main div of the product card with 'product-card' class. If 'isWishlist' is true, it adds 'wishlist' class as well.
    <div className={`product-card ${isWishlist ? "wishlist" : ""}`}>
      {/* Product image */}
      <img src={product.image} alt={product.name} />

      {/* Container for product details */}
      <div className="product-details">
        {/* Product name */}
        <h3>{product.name}</h3>

        {/* Product price */}
        <p>${product.price}</p>
      </div>

      {/* Button to add/remove the product from the wishlist */}
      <button
        onClick={() => handleAddToWishlist(product.id)}
        // If 'isWishlist' is true, it adds 'active' class to style the button differently
        className={isWishlist ? "wishlist-btn active" : "wishlist-btn"}
      >
        {/* The button text changes based on 'isWishlist' */}
        {isWishlist ? "Remove" : "Add to Wishlist"}
      </button>

      {/* Button to view more details of the product (not implemented in this code snippet) */}
      <button className="view-product-btn">View Product</button>
    </div>
  );
};

export default ProductCard;
