import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import SideBar from './SideBar'; 

const NavBar = ({ onFavoriteClick }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className="container bg-NavColor mx-auto px-4 shadow-md h-32">
      <div className="flex justify-between items-center">
        <Link to={"/productos"}>
          <img src="logo.png" alt="Logo grupo 7" className="h-32" />
        </Link>
        <div className="w-[50%] flex flex-col gap-5 bg">
          <div className="input-group flex flex-row rounded-md gap-3 p-2 bg-customColor">
            <input
              type="text"
              className="block w-full py-2 pl-10 text-sm text-gray-700 bg-customColor border-r-2 border-gray-500 focus:outline-none"
              placeholder="Buscar"
            />
            <i className="fa fa-search text-gray-500 mt-2 mx-3" />
          </div>
          <div className="w-full flex justify-around items-center size-5">
            <Link to={"/perfil"}>
              <p className="text-lg font-poppins mb-2">Mis publicaciones</p>
            </Link>
            <p className="text-lg font-poppins mb-2 cursor-pointer" onClick={onFavoriteClick}>Favorito</p>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <div className="flex justify-end">
            <Link to={"/perfil"}>
              <div className="perfil-info flex items-center">
                <img
                  src="./Perfil.png"
                  alt="Perfil"
                  className="h-8 w-8 rounded-full"
                />
                <span className="ml-2 text-sm text-gray-700 font-poppins">
                  Nombre Apellido
                </span>
              </div>
            </Link>
          </div>
          <div className="w-1/2">
            <div className="w-full flex justify-center items-center size-5">
              <FontAwesomeIcon icon={faCartShopping} onClick={toggleSideBar} />
            </div>
          </div>
        </div>
      </div>
      <SideBar isOpen={isSideBarOpen} onClose={toggleSideBar}>
        {/* Aquí puedes añadir el contenido del carrito */}
        <p>Contenido del carrito</p>
      </SideBar>
    </div>
  );
};

export default NavBar;