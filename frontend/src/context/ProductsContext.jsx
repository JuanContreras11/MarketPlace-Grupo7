import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); 
  const [error, setError] = useState(null);

  // Obtener todos los productos
  const fetchProducts = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(data.products || []);
      } else {
        setError('Error al obtener productos');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      console.error('Error al conectar con el servidor:', error);
    }
  };

  // Obtener un producto por ID
  const fetchProductById = async (id, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        return data.product;
      } else {
        setError('Error al obtener el producto');
        return null;
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      console.error('Error al conectar con el servidor:', error);
    }
  };

  // Crear un nuevo producto
  const createProduct = async (newProduct, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      if (response.ok) {
        setProducts([...products, data]);
      } else {
        setError('Error al crear el producto');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      console.error('Error al conectar con el servidor:', error);
    }
  };

  // Actualizar un producto
  const updateProduct = async (id, updatedProduct, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(products.map((product) => (product.id === id ? data.product : product)));
      } else {
        setError('Error al actualizar el producto');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      console.error('Error al conectar con el servidor:', error);
    }
  };

  // Eliminar un producto
  const deleteProduct = async (id, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        setError('Error al eliminar el producto');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      console.error('Error al conectar con el servidor:', error);
    }
  };

  // Función para agregar un producto al carrito
  const addToCart = async (productId, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/carrito`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await response.json();
      if (response.ok) {
        setCart([...cart, data.cartItem]); 
      } else {
        setError('Error al agregar al carrito');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      console.error('Error al conectar con el servidor:', error);
    }
  };

  return (
    <ProductsContext.Provider value={{
      products,
      cart, 
      error,
      fetchProducts,
      fetchProductById,
      createProduct,
      updateProduct,
      deleteProduct,
      addToCart
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

