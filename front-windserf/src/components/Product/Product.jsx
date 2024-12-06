/* eslint-disable react/prop-types */
/* import React from "react";
import picture from "../../assets/foil.jpg"; */
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : null;

  return (
    <div
      className="flex flex-col w-21.5% items-center my-3 mx-3 pt-5 pb-3 
      rounded-lg shadow-md hover:bg-slate-50 transition-colors duration-300"
    >
      <div className="w-4/5">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="flex flex-col items-center my-2 mx-1">
        <h3 className="text-opacity-50 opacity-50 pb-1">
          {product.subCategory}
        </h3>
        <h3 className="text-lg font-semibold mb-5 text-center">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {/* Mostrar precio original tachado y precio descontado si existe un descuento */}
          {product.discount && (
            <span className="text-gray-400 line-through">{`$${product.price}`}</span>
          )}
          <h2
            className={`text-lg font-semibold ${
              product.discount ? "text-green-500" : "text-darkYellow"
            }`}
          >
            {product.discount ? `$${discountedPrice}` : `$${product.price}`}
          </h2>
        </div>
      </div>
      <div className="my-2">
        <Link
          to={`/products/${23}`}
          className="p-2 px-4 bg-brown rounded-3xl text-beige"
        >
          Consultar
        </Link>
      </div>
    </div>
  );
};

export default Product;
