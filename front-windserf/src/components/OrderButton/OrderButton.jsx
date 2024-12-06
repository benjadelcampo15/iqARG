/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const OrderButton = ({ setDynamicSearchParams }) => {
  const [selectedOption, setSelectedOption] = useState("Ordenar por");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const options = [
    "Precio: Bajo a Alto",
    "Precio: Alto a Bajo",
    "Popularidad",
    "Novedades",
  ];

  const updateURLParams = (option) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", option);
    setSearchParams(newSearchParams);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsMenuOpen(false);
    updateURLParams(option);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const newParams = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });
    setDynamicSearchParams(newParams);
  }, [searchParams, setDynamicSearchParams]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        className="inline-flex justify-between items-center w-full rounded-md border border-light-gray shadow-sm px-4 py-2 bg-beige text-sm font-medium text-dark-gray hover:bg-light-gray"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {selectedOption}
        {isMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {isMenuOpen && (
        <div className="absolute mt-4 w-56 max-w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform transform duration-200 ease-in-out">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="block w-full text-left px-4 py-2 text-sm text-dark-gray hover:bg-light-gray"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderButton;
