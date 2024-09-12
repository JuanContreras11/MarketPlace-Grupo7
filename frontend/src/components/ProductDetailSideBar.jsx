import React from 'react'
import Sidebar from './SideBar'

const ProductDetailSideBar  = ({ isOpen, onClose, product }) => {
    if (!product) return null;
  
    return (
        <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 w-[40%] h-full bg-customColor shadow-lg rounded-r-3xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 bg flex flex-col">
          <button onClick={onClose} className="text-red-500 mb-5  ">
            Cerrar
          </button>
          <h2 className="text-2xl mb-4">{product.name}</h2>
         <p className="mb-4">{product.description}</p>
         <p className="mb-4">Categoría: {product.category}</p>
         <img src={product.image} alt={product.name} className="w-[70%] h-auto mb-4 drop-shadow-lg" />
         <p className="mb-4">Precio: ${product.price}</p>
         <div className='flex flex-row justify-between'>
         <button
              type="submit"
              className="w-1/2 rounded-full  bg-red-600 p-3 text-white transition hover:bg-opacity-90"
            >Agregar al Carrito</button>
        <button
              type="submit"
              className="w-1/2 rounded-full  bg-red-600 p-3 text-white transition hover:bg-opacity-90"
              >Ir a pagar</button>
              </div>
        </div>        
      </div>
    </>

    );
  };

export default ProductDetailSideBar