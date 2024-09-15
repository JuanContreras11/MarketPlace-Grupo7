import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';

const CreateProduct = () => {
  const { user } = useAuth();
  const { addProduct } = useContext(ProductsContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      setError('No estás autenticado');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ category, name, description, image, price }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Error al crear el producto');
      } else {
        addProduct(result);
        navigate('/product');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default CreateProduct;
