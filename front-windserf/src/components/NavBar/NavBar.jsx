import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Categories from "../Categories/Categories";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo-IQFoil.png";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (id) => {
    navigate(`products/${id}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Alterna entre abierto y cerrado
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Cierra el menú
  };

  return (
    <div className="flex flex-row justify-between items-center py-5 px-1 bg-brown">
      <Link to="/">
        <img className="ml-1 md:ml-4 w-10 md:w-24" src={Logo} alt="Logo" />
      </Link>
      <div className="z-10 relative w-5 md:w-28rem h-8 md:h-10 md:flex md:justify-start flex  justify-center ">
        <div className="absolute w-60 lg:w-full md:w-auto mr-5 md:mr-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      {/* Menú Hamburguesa */}
      <div className="flex lg:hidden">
        <button
          className="text-beige focus:outline-none"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          {/* Icono del menú hamburguesa */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <div className="hidden lg:block">
        <Categories />
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-full bg-white z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start p-6">
          <button
            className="text-brown mb-4"
            onClick={closeMenu}
            aria-label="Cerrar menú"
          >
            {/* Icono de cerrar */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Categories onCategoryClick={closeMenu} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
