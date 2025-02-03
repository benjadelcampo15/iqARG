import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../../context/ProductContext";
import RelatedProducts from "./RelatedProducts";
import { v4 as uuidv4 } from "uuid";

const ProductDetail = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const currentUrl = useNavigate().pathname;
  const { products, addView } = useProducts();

  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(null);

  const menuRefs = useRef([]);

  const product = products?.find((p) => {
    return p.id === id;
  });

  const image =
    product?.img.length > 73
      ? product?.img
      : product?.img.substr(23).replaceAll("\\", `/`).replaceAll(" ", "%20");

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
    if (!product) return;

    const currentUserId = userId || uuidv4();
    if (!userId) {
      localStorage.setItem("userId", currentUserId);
      setUserId(currentUserId);
    }

    const viewedProducts = JSON.parse(
      localStorage.getItem("viewedProducts") || "[]"
    );

    if (!viewedProducts.includes(product.id)) {
      addView(product.id, currentUserId);
      localStorage.setItem(
        "viewedProducts",
        JSON.stringify([...viewedProducts, product.id])
      );
    }
  }, [product, addView, userId]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (product) {
      if (product.discount)
        setDiscountedPrice(
          (product.price * (1 - product.discount / 100)).toFixed(2)
        );
    }
  }, [product]);

  const dynamicProperties = getDynamicProperties(product);

  /*   if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>; */

  if (!product) return <p>Product not found.</p>;

  return (
    <main className="overflow-x-hidden">
      <section className="flex flex-col items-center mt-2 sm:mt-1 sm:ml-52 sm:mb-24">
        <div className="flex flex-row text-gray text-sm sm:text-lg">
          <Link to="/" className="">
            Home
          </Link>
          <p className="mx-1">{">"}</p>
          <Link to={`/${product.category.name}`} className="">
            {product.category.name}
          </Link>
          <p className="mx-1">{">"}</p>
          <Link to={`/${product.category.name}/${product.subCategory.name}`}>
            {product.subCategory.name}
          </Link>
          <p className="mx-1">{">"}</p>
          <Link>{product.name}</Link>
        </div>
        <section className="flex flex-col md:flex-row flex-wrap">
          {/* Estaba vacio */}
          {window.innerWidth > 640 ? (
            <div className="flex flex-row">
              <div className="w-full max-w-md aspect-w-16 aspect-h-9 overflow-hidden rounded-lg mr-10">
                {/* w-2/5 h-2/5 overflow-hidden */}
                <img
                  className="w-full max-w-[300px] h-full object-cover"
                  src={image}
                  alt={product.name}
                />
              </div>
              <div className="flex flex-row w-full gap-14 md:w-3/5 md:ml-6">
                <div className="w-full md:w-3/5">
                  <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                  <h4 className="text-2xl font-semibold text-gray mb-10">
                    {product.brand}
                  </h4>
                  <h2 className="text-4xl font-semibold text-yellow-500 mb-10">
                    {discountedPrice ? (
                      <div className="flex items-center gap-4">
                        {/* Precio original tachado */}
                        <span className="text-2xl text-brown line-through">{`$${product.price}`}</span>
                        {/* Precio con descuento */}
                        <span className="text-4xl text-green-500">{`$${discountedPrice}`}</span>
                      </div>
                    ) : (
                      // Precio normal
                      `$${product.price}`
                    )}
                  </h2>
                  {Object.keys(dynamicProperties).map((property, index) => (
                    <div className="mb-5" key={index}>
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
                              {dynamicProperties[property].map(
                                (option, index) => (
                                  <button
                                    key={index + option}
                                    onClick={() =>
                                      handleOptionChange(property, option)
                                    }
                                    className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-slate-50"
                                  >
                                    {option}
                                  </button>
                                )
                              )}
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
                </div>
                <div className="w-2/3">
                  <h2 className="text-2xl font-semibold">Descripcion</h2>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-4">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <h4 className="text-xl font-semibold text-gray mb-1">
                {product.brand}
              </h4>
              <div className="w-11/12 max-w-md mb-2 aspect-w-16 aspect-h-9 overflow-hidden rounded-lg ">
                {/* w-2/5 h-2/5 overflow-hidden */}
                <img
                  className="w-full h-full object-cover"
                  src={image}
                  alt={product.name}
                />
              </div>
              <div className="flex flex-row w-full gap-16 justify-between px-4 md:w-3/5 md:ml-6">
                {/* flex flex-col w-3/5 */}
                <div>
                  <h2 className="text-3xl font-semibold text-yellow-500 mb-10">
                    {discountedPrice ? (
                      <div className="flex items-center gap-3">
                        {/* Precio original tachado */}
                        <span className="text-xl text-brown line-through">{`$${product.price}`}</span>
                        {/* Precio con descuento */}
                        <span className="text-3xl text-green-500">{`$${discountedPrice}`}</span>
                      </div>
                    ) : (
                      // Precio normal
                      `$${product.price}`
                    )}
                  </h2>
                  {Object.keys(dynamicProperties).map((property, index) => (
                    <div className="mb-5" key={index}>
                      <label className="block text-lg font-semibold mb-1 capitalize z-0">
                        {property}
                      </label>
                      <div
                        className="relative inline-block text-left"
                        ref={(div) => (menuRefs.current[index] = div)}
                      >
                        <button
                          className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
                          onClick={() => handleMenuOpen(index)}
                        >
                          {selectedOptions[property] || "Seleccionar"}
                        </button>
                        {isMenuOpen === index && (
                          <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-0">
                              {dynamicProperties[property].map(
                                (option, index) => (
                                  <button
                                    key={index + option}
                                    onClick={() =>
                                      handleOptionChange(property, option)
                                    }
                                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-slate-50"
                                  >
                                    {option}
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-min">
                  <h2 className="text-xl font-semibold">Descripcion</h2>
                  <p className="text-sm">{product.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleSubmit()}
                className="w-auto mt-16 mb-6 py-2 px-10 border rounded-lg bg-lightYellow border-lightYellow hover:bg-darkYellow border-darkYellow"
              >
                Consultar disponibilidad
              </button>
            </div>
          )}
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
