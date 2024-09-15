import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const MisPublicaciones = () => {
  const { products, error } = useContext(ProductsContext);

  console.log('Mis publicaciones:', products); 

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      {products.map((publicacion) => (
        <div key={publicacion.id} className="card">
          <h1 className="text-lg md:text-sm">{publicacion.name}</h1>
          <p className="text-sm md:text-xs pb-2">{publicacion.description}</p>
          <img src={publicacion.image} alt={publicacion.name} className="w-full sm:w-48 md:w-64 lg:w-80 object-cover" />
        </div>
      ))}
    </div>
  );
};

export default MisPublicaciones;
