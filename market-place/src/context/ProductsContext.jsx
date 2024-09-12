import React, { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/products.json');
                if (!response.ok) {
                    setError('Error en la respuesta de la red');
                    return;
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError('Error al cargar el JSON');
                console.error('Error al cargar el JSON:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ products, error }}>
            {children}
        </ProductsContext.Provider>
    );
};

