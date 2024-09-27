import React from "react";
import picture from "../../assets/foil.jpg";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <div
      className="flex flex-col w-1/5 items-center my-3 mx-3 pt-5 pb-3 
    rounded-lg shadow-md hover:bg-slate-50 transition-colors duration-300"
    >
      <div className="w-4/5">
        <img src={picture} alt="" /> {/* P name */}
      </div>
      <div className="flex flex-col items-center my-2">
        <h3 className="text-opacity-50 opacity-50 pb-1">Velas</h3>{" "}
        {/* subcategory */}
        <h3 className="text-lg font-semibold mb-5 text-center">
          Vela Doutone I Rig Iforitlet Oronsobil Aleflrs
        </h3>{" "}
        {/* product name */}
        <h2 className="text-lg text-darkYellow font-semibold">$733</h2>{" "}
        {/* price */}
      </div>
      <div className="mt-2">
        <Link
          to={`/products/${23}`}
          className="p-2 px-4 bg-brown rounded-3xl text-beige"
        >
          Consultar
        </Link>{" "}
        {/* consultar producto */}
      </div>
    </div>
  );
};

export default Product;
