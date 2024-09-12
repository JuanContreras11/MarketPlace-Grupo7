import React from "react";
import ProductItem from './ProductItem';

const SideBar = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-customColor shadow-lg rounded-l-3xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <button onClick={onClose} className="text-red-500 mb-5">
            Cerrar
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default SideBar;
