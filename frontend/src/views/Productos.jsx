import React, { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { useEffect } from "react";
import ProductItem from "../components/ProductItem";
import Filter from "../components/Filter";
import NavBar from "../components/NavBar";
import FavoriteSidebar from '../components/FavoriteSidebar';
import ProductDetailSidebar from '../components/ProductDetailSideBar';
import Footer from "../components/Footer";


const Productos = () => {
  const { products, error } = useContext(ProductsContext);
  const [sortOrder, setSortOrder] = useState("default");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isDetailSidebarOpen, setIsDetailSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

 const handleFavoriteClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailSidebarOpen(true);
  };

  const handleCloseDetailSidebar = () => {
    setIsDetailSidebarOpen(false);
    setSelectedProduct(null);
  };

const handleToggleFavorite = (product) => {
    const updatedFavorites = favorites.some(fav => fav.id === product.id)
      ? favorites.filter(fav => fav.id !== product.id)
      : [...favorites, product];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const latestProducts = [...sortedProducts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 bg-customColor">
       <NavBar onFavoriteClick={handleFavoriteClick} />
       <FavoriteSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} favorites={favorites} onToggleFavorite={handleToggleFavorite}/>
       <ProductDetailSidebar isOpen={isDetailSidebarOpen} onClose={handleCloseDetailSidebar} product={selectedProduct} />
      <section className="mb-8">
        <div className="mt-5 mb-5 flex justify-between">
          <h2 className="text-2xl mb-4 font-poppins font-medium">Novedades</h2>
          <Filter onSortChange={handleSortChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {latestProducts.length > 0 ? (
            latestProducts.map((product) => (
              <ProductItem key={product.id} product={product}
              onToggleFavorite={handleToggleFavorite} onClick={() => handleProductClick(product)} />
            ))
          ) : (
            <p>No hay novedades disponibles.</p>
          )}
        </div>
      </section>
      <h1 className="text-3xl font-bold my-8">Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4  p-4">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductItem key={product.id} product={product}
             onToggleFavorite={handleToggleFavorite} onClick={() => handleProductClick(product)}/>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
      <Footer />  
    </div>
  );
};

export default Productos;
