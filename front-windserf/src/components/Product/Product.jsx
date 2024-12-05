/* eslint-disable react/prop-types */
/* import React from "react";
import picture from "../../assets/foil.jpg"; */
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div
      className="flex flex-col w-21.5% items-center my-3 mx-3 pt-5 pb-3 
    rounded-lg shadow-md hover:bg-slate-50 transition-colors duration-300"
    >
      <div className="w-4/5">
        <img src={product.image} alt="" /> {/* P name */}
      </div>
      <div className="flex flex-col items-center my-2 mx-1">
        <h3 className="text-opacity-50 opacity-50 pb-1">
          {product.subCategory}
        </h3>
        <h3 className="text-lg font-semibold mb-5 text-center">
          {product.name}
        </h3>
        <h2 className="text-lg text-darkYellow font-semibold">{`$${product.price}`}</h2>
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
