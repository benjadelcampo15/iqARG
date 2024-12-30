/* eslint-disable react/prop-types */
import { useState } from "react";
import lupa from "../../assets/lupa.png";
import { useProducts } from "../../context/ProductContext";
/* import { useSearchParams } from "react-router-dom"; */

const SearchBar = ({ onSearch }) => {
  const { products } = useProducts();
  const [input, setInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  /* const [searchParams, setSearchParams] = useSearchParams(); */

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const results = products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(value.toLowerCase()) &&
          value !== ""
      )
      .slice(0, 5);

    if (results.length > 0) {
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleOnSearch = (id) => {
    setFilteredProducts([]);
    onSearch(id);
  };

  /*   const handleSubmit = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    //VER SI TIENE QUE ESTAR EN INGLES O ESPAÑOL
    newSearchParams.set("Name", input);
    setSearchParams(newSearchParams);
  }; */

  return (
    <div className="flex flex-col max-w-full bg-beige p-2 rounded-lg text-sm md:text-base">
      {/* Barra de búsqueda */}
      <div className="flex justify-between bg-beige rounded-full">
        {/* VER COMO APLICAR ESTILO PARA QUE SE BORRE LO ESCRITO AL SELECCIONAR UN PRODUCTO O AL CLICKEAR FUERA DE LA BARRA */}
        <input
          className="bg-beige border-0 outline-0 pl-2 w-80 flex-grow"
          type="text"
          placeholder="Buscar"
          value={input}
          onChange={handleInputChange}
        />

        <div className="w-4 h-4 mt-1 mr-1">
          <img src={lupa} alt="Buscar" />
        </div>
      </div>

      {filteredProducts.length > 0 && (
        <ul className="mt-2 bg-white rounded-lg shadow-lg">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="p-2 border-b last:border-none hover:bg-slate-50 cursor-pointer"
              onClick={() => handleOnSearch(product.id)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
