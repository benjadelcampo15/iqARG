/* eslint-disable react/prop-types */
/* import React from "react";
import picture from "../../assets/foil.jpg"; */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [discountedPrice, setDiscountedPrice] = useState(null);
  /* console.log(product); */

  useEffect(() => {
    if (product.discount) {
      setDiscountedPrice(
        (product.price * (1 - product.discount / 100)).toFixed(2)
      );
    }
  }, [product.price, product.discount]);

  return (
    <div
      className="flex flex-col w-21.5% items-center my-3 mx-3 pt-5 pb-3 
      rounded-lg justify-between shadow-md hover:bg-slate-50 transition-colors duration-300"
    >
      <div className="flex flex-col items-center">
        <div className="w-full max-w-xs aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
          {/* w-4/5 */}
          <img
            className="object-cover w-full h-full"
            src={product.img}
            alt={product.name}
          />
          {/* No tenia clase */}
        </div>
        <div className="flex flex-col items-center my-2 mx-1">
          <h3 className="text-opacity-50 opacity-50 pb-1 text-center">
            {product.subCategory.name}
          </h3>
          <h3 className="text-lg font-semibold mb-5 text-center">
            {product.name}
          </h3>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-1">
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
        <div className="my-2">
          <Link
            to={`/products/${product.id}`}
            className="p-2 px-4 bg-brown rounded-3xl text-beige"
          >
            Consultar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
