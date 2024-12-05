/* eslint-disable react/prop-types */
import { useState } from "react";
import lupa from "../../assets/lupa.png";
import { useProducts } from "../../context/ProductContext";
import { useSearchParams } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const { products } = useProducts();
  const [input, setInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  /* const products = [
    {
      id: 1,
      name: "Windsurf Tabla Mamba TE",
      brand: "Fanatic",
      price: "1.237",
      sizes: ["Small", "Medium", "Large"],
      colors: ["Red", "Blue"],
      category: "Windsurf",
      subCategory: "Tablas",
      description: "Tabla de alta calidad para windsurfistas avanzados.",
    },
    {
      name: "Paddle Surf Tabla Pure Air",
      brand: "Fanatic",
      price: "899",
      sizes: ["10'6\"", "11'6\""],
      colors: ["Green", "White"],
      category: "Paddle Surf",
      subCategory: "Tablas",
      description: "Ideal para principiantes y actividades recreativas.",
    },
    {
      name: "Velas North Sails E-Type",
      brand: "North Sails",
      price: "560",
      sizes: ["4.0", "5.0", "6.0"],
      colors: ["Orange", "Black"],
      category: "Windsurf",
      subCategory: "Velas",
      description: "Vela versátil con excelente rendimiento.",
    },
    {
      name: "Arnés Windsurf Ride Harness",
      brand: "Dakine",
      price: "230",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Gray"],
      category: "Windsurf",
      subCategory: "Arneses",
      description: "Arnés cómodo y seguro para largas sesiones.",
    },
    {
      name: "Traje de Neopreno Reactor II",
      brand: "O'Neill",
      price: "120",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Black"],
      category: "Surf",
      subCategory: "Trajes",
      description: "Traje de neopreno flexible y resistente al agua fría.",
    },
    {
      name: "Remo Ajustable Carbono",
      brand: "Fanatic",
      price: "180",
      sizes: ["175-215cm"],
      colors: ["Black", "Yellow"],
      category: "Paddle Surf",
      subCategory: "Remo",
      description: "Remo ultraligero ajustable de carbono.",
    },
    {
      name: "Kite Cabrinha Switchblade",
      brand: "Cabrinha",
      price: "1.250",
      sizes: ["8m", "10m", "12m"],
      colors: ["Green", "Orange"],
      category: "Kitesurf",
      subCategory: "Kites",
      description: "Kite de alto rendimiento para todo tipo de condiciones.",
    },
    {
      name: "Tabla Kitesurf Ace Carbon",
      brand: "Cabrinha",
      price: "1.050",
      sizes: ["135cm", "145cm"],
      colors: ["Black", "Blue"],
      category: "Kitesurf",
      subCategory: "Tablas",
      description: "Tabla ligera y ágil para maniobras rápidas.",
    },
    {
      name: "Foil Surf Aero 2000",
      brand: "Fanatic",
      price: "1.499",
      sizes: ["2000cm²"],
      colors: ["White", "Black"],
      category: "Foil Surf",
      subCategory: "Foils",
      description: "Foil ideal para surfistas avanzados.",
    },
    {
      name: "Mochila Estanca 40L",
      brand: "Dakine",
      price: "75",
      sizes: ["40L"],
      colors: ["Gray", "Blue"],
      category: "Accesorios",
      subCategory: "Mochilas",
      description: "Protege tus pertenencias del agua con estilo.",
    },
    {
      name: "Neopreno Juvenil Junior React",
      brand: "O'Neill",
      price: "80",
      sizes: ["S", "M", "L"],
      colors: ["Pink", "Blue"],
      category: "Surf",
      subCategory: "Trajes",
      description: "Traje diseñado para los más jóvenes.",
    },
    {
      name: "Bomba Infladora Doble Acción",
      brand: "Fanatic",
      price: "35",
      sizes: ["Standard"],
      colors: ["Black", "Red"],
      category: "Paddle Surf",
      subCategory: "Accesorios",
      description: "Bomba para inflar tablas y kites rápidamente.",
    },
    {
      name: "Quilla Central Flow 24",
      brand: "Fanatic",
      price: "55",
      sizes: ["24cm"],
      colors: ["Black"],
      category: "Windsurf",
      subCategory: "Accesorios",
      description: "Quilla duradera para mayor estabilidad.",
    },
    {
      name: "Bolsa de Viaje SUP Deluxe",
      brand: "Fanatic",
      price: "150",
      sizes: ["12'6\""],
      colors: ["Gray"],
      category: "Paddle Surf",
      subCategory: "Accesorios",
      description: "Protege tu tabla durante el transporte.",
    },
    {
      name: "Chaleco Salvavidas Pro Rider",
      brand: "Dakine",
      price: "120",
      sizes: ["S", "M", "L"],
      colors: ["Black", "Yellow"],
      category: "Accesorios",
      subCategory: "Seguridad",
      description: "Chaleco ajustado para máxima movilidad.",
    },
    {
      name: "Casco Deportivo Ocean Pro",
      brand: "ProTec",
      price: "85",
      sizes: ["S", "M", "L"],
      colors: ["Blue", "Black"],
      category: "Accesorios",
      subCategory: "Seguridad",
      description: "Casco ligero y resistente para deportes acuáticos.",
    },
    {
      name: "Correa SUP 10ft ProFlex",
      brand: "Fanatic",
      price: "30",
      sizes: ["10ft"],
      colors: ["Black"],
      category: "Paddle Surf",
      subCategory: "Accesorios",
      description: "Correa resistente para seguridad en el agua.",
    },
    {
      name: "Traje Neopreno Mujer Epic",
      brand: "O'Neill",
      price: "140",
      sizes: ["S", "M", "L"],
      colors: ["Black", "Purple"],
      category: "Surf",
      subCategory: "Trajes",
      description: "Traje diseñado específicamente para mujeres.",
    },
    {
      name: "Funda para Tabla Pro XL",
      brand: "Fanatic",
      price: "99",
      sizes: ["XL"],
      colors: ["Gray"],
      category: "Accesorios",
      subCategory: "Fundas",
      description: "Funda acolchada para máxima protección.",
    },
    {
      name: "Botines Neopreno Heat 5mm",
      brand: "O'Neill",
      price: "60",
      sizes: ["38", "40", "42", "44"],
      colors: ["Black"],
      category: "Surf",
      subCategory: "Accesorios",
      description: "Mantén tus pies calientes en aguas frías.",
    },
  ]; */

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const results = products
      .filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 5);

    setFilteredProducts(results);
  };

  const handleSubmit = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    //VER SI TIENE QUE ESTAR EN INGLES O ESPAÑOL
    newSearchParams.set("Name", input);
    setSearchParams(newSearchParams);
  };

  return (
    /*     <div className="flex max-w-full bg-beige p-2 rounded-full text-sm md:text-base justify-between">
      <input
        className="bg-beige border-0 outline-0 pl-2"
        type="text"
        placeholder="Buscar"
        value={input}
        onChange={handleInputChange}
      />
      <div className="w-4 h-4 mt-1 mr-1">
        <img src={lupa} className="w" alt="" />
      </div>
    </div> */
    <div className="flex flex-col max-w-full bg-beige p-2 rounded-lg text-sm md:text-base">
      {/* Barra de búsqueda */}
      <div className="flex justify-between bg-beige rounded-full">
        <form onSubmit={handleSubmit}>
          <input
            className="bg-beige border-0 outline-0 pl-2 flex-grow"
            type="text"
            placeholder="Buscar"
            value={input}
            onChange={handleInputChange}
          />
        </form>
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
              onClick={() => onSearch(product.id)}
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
