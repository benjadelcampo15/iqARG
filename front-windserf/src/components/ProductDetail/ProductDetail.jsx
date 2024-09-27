import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { category, subCategory } = useParams();
  const [selectedOption, setSelectedOption] = useState("Elegir medida");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const sizes = [2.0, 2.4, 2.8];
  const product = {
    name: "Windsurf Tabla Mamba TE",
    brand: "Fanatic",
    price: "1.237",
    sizes: sizes,
    category: "Windsurf",
    subCategory: "Tablas",
    description: "",
  };

  const handleSizeClick = (option) => {
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
    <main className="ml-52">
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
                "https://acdn.mitiendanube.com/stores/001/102/572/products/producto-tn-5-0f2c77b4c638fec31017256298586857-1024-1024.webp"
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
              {`$${product.price}`}
            </h2>
            <label className="text-xl font-semibold mb-2" htmlFor="">
              Medida
            </label>
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
            </div>
            <button className="w-auto self-start mt-16 mb-6 py-2 px-20 border rounded-lg bg-lightYellow border-lightYellow hover:bg-darkYellow border-darkYellow">
              Consultar disponibilidad
            </button>
            <div className="w-2/3">
              <h2 className="text-2xl font-semibold">Descripcion</h2>
              <p>
                Fanatic Mamba TE 2023 reemplaza la mítica tabla de olas Stubby
                en nuestra gama. Recoge todas las cualidades de la stubby en
                olas mediocres, pero es mucho más eficiente cuando las
                condiciones mejoran. La Mamba es la evolución de nuestra gama
                Stubby, de la cual nuestro equipo de I + D ha evolucionado
                constantemente el contorno original hacia un perfil cada vez más
                paralelo y secciones delanteras / traseras más escondidas. El
                resultado es un nuevo aspecto y una gama de uso aún más amplia.
                Las principales características de la Stubby se combinan con una
                cola más estrecha y un nose más delgado, lo que mejora la
                estética de la tabla pero lo más importante te permite ajustar
                tus cambios de dirección y tu capacidad de respuesta de
                conducción más rápidamente cuando las olas mejoran. Con su
                rápido planeo, gran maniobrabilidad en el chopy, no tienes que
                ser un pro para hacer reventar todas las olas con la Mamba.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
