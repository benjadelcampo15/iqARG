import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useState } from "react";

const Categories = ({ onCategoryClick }) => {
  const { categories } = useProducts();
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = useState(null); // Estado para la categoría activa

  const handleMouseEnter = (categoryName) => {
    if (window.innerWidth >= 1024) {
      setOpenCategory(categoryName);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setOpenCategory(null);
    }
  };

  const handleCategoryClick = (categoryName) => {
    if (window.innerWidth < 1024 && openCategory !== null) {
      navigate(`${openCategory}`);
      setOpenCategory(null);
      onCategoryClick?.();
    } else if (window.innerWidth < 1024) {
      setOpenCategory(openCategory === categoryName ? null : categoryName);
    }
  };

  const handleSubCategoryClick = () => {
    setOpenCategory(null); // Cierra cualquier categoría abierta
    onCategoryClick?.(); // Ejecuta la acción pasada como prop
  };

  return (
    <div className="flex flex-wrap lg:flex-row lg:mr-6 text-brown lg:text-beige z-50">
      {categories.map((category) => (
        <div
          key={category.name}
          className="relative group lg:mx-4 flex flex-col items-center lg:items-start"
          onMouseEnter={() => handleMouseEnter(category.name)} // Abre el menú al pasar el mouse
          onMouseLeave={handleMouseLeave} // Cierra el menú al salir del hover
        >
          {/* Categoría principal */}
          <button
            className="flex items-center justify-between w-full px-4 py-2 lg:px-0 lg:py-0 font-open_sans lg:hover:text-white"
            onClick={() => handleCategoryClick(category.name)} // Solo se activa en pantallas pequeñas
          >
            {category.name}
          </button>

          {/* Subcategorías */}
          <div
            className={`absolute z-50 top-full lg:left-1/2 lg:transform lg:-translate-x-1/2 mt-2 lg:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out ${
              openCategory === category.name
                ? "block opacity-100"
                : "hidden opacity-0"
            }`}
          >
            <div className="py-1">
              {category.subCategories.map((subcategory) => (
                <Link
                  key={subcategory.name}
                  to={`/${category.name}/${subcategory.name}`}
                  className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
                  onClick={handleSubCategoryClick}
                >
                  {subcategory.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
