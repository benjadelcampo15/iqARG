import React, { useEffect, useRef, useState } from "react";

const OrderButton = () => {
  const [selectedOption, setSelectedOption] = useState("Ordenar por");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Opciones de ordenamiento
  const options = [
    "Precio: Bajo a Alto",
    "Precio: Alto a Bajo",
    "Popularidad",
    "Novedades",
  ];

  // Función para seleccionar una opción y cerrar el menú
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsMenuOpen(false); // Cerrar el menú después de seleccionar
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

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Botón principal que muestra la opción seleccionada */}
      <button
        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle del menú
      >
        {selectedOption} {/* Mostrar la opción seleccionada */}
      </button>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className="absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)} // Manejar clic en la opción
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
