import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const message = `Error: ${response.status} - ${response.statusText}`;
        console.error(message);
        setError(message);
        return;
      }

      const data = await response.json();
      console.log('Productos obtenidos:', data);
      setProducts(data);
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setError('No se pudo obtener los productos. Inténtalo más tarde.');
    }
  };

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  return (
    <ProductsContext.Provider value={{ products, error, fetchProducts, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
