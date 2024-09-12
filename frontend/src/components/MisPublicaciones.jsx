import React, { useContext, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";

const MisPublicaciones = () => {
    const { products, error } = useContext(ProductsContext);
    
    return (
        products.map((publicacion) => (
            <div key={publicacion.id} className="card">
                <h1 className="text-lg md:text-sm">{publicacion.name}</h1>
                <p className="text-sm md:text-xs pb-2">{publicacion.description}</p>
                <img src={publicacion.image} alt={publicacion.image} className="w-full sm:w-48 md:w-64 lg:w-80 object-cover" />
            </div>
        ))
    );
    
    
};
export default MisPublicaciones;