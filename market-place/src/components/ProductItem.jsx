import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";


const ProductItem = ({ product, onToggleFavorite,onClick }) => {

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(fav => fav.id === product.id));
  }, [product.id]);

  const handleFavoriteClick = () => {
    if (typeof onToggleFavorite === 'function') {
      onToggleFavorite(product);
      setIsFavorite(!isFavorite);
    } else {
      console.error('onToggleFavorite is not a function');
    }
  };
  return (
    
    <div className=" bg-cardColor border border-gray-300 rounded-lg shadow-md my-3 p-4 ">
      <img
        className="w-full h-48 object-cover rounded-t-lg cursor-pointer" onClick={onClick}
        src={product.image}
        alt={product.name}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 cursor-pointer" onClick={onClick}>{product.name}</h3>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-gray-600 mb-2">
          <strong>Category:</strong> {product.category}
        </p>
        <p className="text-gray-800 font-bold">
          <strong>Price:</strong> ${product.price.toLocaleString()}
        </p>
         <FontAwesomeIcon
        icon={faHeart}
        onClick={handleFavoriteClick}
        className={isFavorite ? 'text-red-500' : 'text-gray-500'}
      />
      </div>
    </div>
  );
};

export default ProductItem;
