import React from 'react';
import ProductItem from './ProductItem';
import SideBar from './SideBar';

const FavoriteSidebar = ({ isOpen, onClose, favorites, onToggleFavorite }) => {
  return (
   <SideBar isOpen={isOpen} onClose={onClose}  >
    <h2 className="text-2xl mb-4">Favoritos</h2>
    <div className="overflow-y-auto h-5/6">
      {favorites.length > 0 ? (
        favorites.map((product) => (
          <ProductItem key={product.id} product={product} onToggleFavorite={onToggleFavorite} />
        ))
      ) : (
        <p>No hay productos favoritos.</p>
      )}
    </div>
   </SideBar>
  );
};

export default FavoriteSidebar;

