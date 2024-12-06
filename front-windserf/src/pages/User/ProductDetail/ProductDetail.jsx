import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useProducts } from "../../../context/ProductContext";
import RelatedProducts from "./RelatedProducts";
import { v4 as uuidv4 } from "uuid";

const ProductDetail = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const currentUrl = useNavigate().pathname;
  const { products, loading, error } = useProducts();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  /*   const sizes = [2.0, 2.4, 2.8];
  const colors = ["Red", "Blue", "Yellow"];
  const product = {
    name: "Windsurf Tabla Mamba TE",
    brand: "Fanatic",
    price: "1.237",
    sizes: sizes,
    colors: colors,
    category: "Windsurf",
    subCategory: "Tablas",
    description: "",
    }; */
  const menuRefs = useRef([]);

  const product = products.find((p) => p.id === parseInt(id));

  function getDynamicProperties(product) {
    const dynamicProperties = {};

    for (const property in product) {
      if (Array.isArray(product[property]) && product[property].length > 1) {
        dynamicProperties[property] = product[property];
      }
    }

    return dynamicProperties;
  }

  const handleOptionChange = (property, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [property]: option,
    }));
    setIsMenuOpen(null);
  };

  const handleSubmit = () => {
    const texto = `Me interesa este producto y me gustaria obtener mas informacion! ${
      product.name
    } ${
      !Object.keys(selectedOptions).length === 0 &&
      Object.keys(selectedOptions).map(
        (key) => `${key}= ${selectedOptions[key]}`
      )
    }. Link del producto: ${currentUrl}`;
    const encodedText = encodeURIComponent(texto);
    const whatsappLink = `https://wa.me/+549111234567/?text=${encodedText}`;
    window.open(whatsappLink, "_blank");
  };

  const handleClickOutside = (event) => {
    if (
      isMenuOpen !== null &&
      menuRefs.current[isMenuOpen] &&
      !menuRefs.current[isMenuOpen].contains(event.target)
    ) {
      setIsMenuOpen(null);
    }
  };

  const handleMenuOpen = (index) => {
    setIsMenuOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (!userId) {
      const newUserId = uuidv4();
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
    }
  }, [userId]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : null;

  const dynamicProperties = getDynamicProperties(product);

  /*   if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>; */

  if (!product) return <p>Product not found.</p>;

  return (
    <main>
      <section className="ml-52">
        <div className="flex flex-row text-gray text-lg">
          <Link to="/" className="">
            Home
          </Link>
          <p className="mx-1">{">"}</p>
          <Link to={`/${product.category}`} className="">
            {product.category}
          </Link>
          <p className="mx-1">{">"}</p>
          <Link to={`/${product.category}/${product.subCategory}`}>
            {product.subCategory}
          </Link>
          <p className="mx-1">{">"}</p>
          <Link>{"Windsurf Tabla Mamba TE"}</Link>
        </div>
        <section className="">
          <div className="flex flex-row">
            <div className="w-2/5 h-2/5 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={
                  /* "https://acdn.mitiendanube.com/stores/001/102/572/products/producto-tn-5-0f2c77b4c638fec31017256298586857-1024-1024.webp" */
                  product.image
                }
                alt=""
              />
            </div>
            <div className="flex flex-col w-3/5">
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <h4 className="text-2xl font-semibold text-gray mb-5">
                {product.brand}
              </h4>
              <h2 className="text-4xl font-semibold text-brown mb-8">
                {discountedPrice ? (
                  <div className="flex items-center gap-4">
                    {/* Precio original tachado */}
                    <span className="text-2xl text-gray-400 line-through">{`$${product.price}`}</span>
                    {/* Precio con descuento */}
                    <span className="text-4xl text-green-500">{`$${discountedPrice}`}</span>
                  </div>
                ) : (
                  // Precio normal
                  `$${product.price}`
                )}
              </h2>
              {Object.keys(dynamicProperties).map((property, index) => (
                <div key={index}>
                  <label className="block text-xl font-semibold mb-2 capitalize z-0">
                    {property}
                  </label>
                  <div
                    className="relative inline-block text-left"
                    ref={(div) => (menuRefs.current[index] = div)}
                  >
                    <button
                      className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      onClick={() => handleMenuOpen(index)}
                    >
                      {selectedOptions[property] || "Seleccionar"}
                    </button>
                    {isMenuOpen === index && (
                      <div className="absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          {dynamicProperties[property].map((option) => (
                            <button
                              key={option}
                              onClick={() =>
                                handleOptionChange(property, option)
                              }
                              className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-slate-50"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={() => handleSubmit()}
                className="w-auto self-start mt-16 mb-6 py-2 px-20 border rounded-lg bg-lightYellow border-lightYellow hover:bg-darkYellow border-darkYellow"
              >
                Consultar disponibilidad
              </button>
              <div className="w-2/3">
                <h2 className="text-2xl font-semibold">Descripcion</h2>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </section>
      </section>
      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
      />
    </main>
  );
};

export default ProductDetail;

/* <label className="text-xl font-semibold mb-2" htmlFor="">
Medida
</label>
<div className="relative inline-block text-left" ref={menuRef}>
{/* Botón principal que muestra la opción seleccionada 
<button
  className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
  onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle del menú
>
  {selectedOption} {/* Mostrar la opción seleccionada 
</button>

{/* Menú desplegable 
{isMenuOpen && (
  <div className="absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
    <div className="py-1">
      {product.sizes.map((size) => (
        <button
          key={size}
          onClick={() => handleSizeClick(size)} // Manejar clic en la opción
          className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-slate-50"
        >
          {size}
        </button>
      ))}
    </div>
  </div>
)}
</div> */
