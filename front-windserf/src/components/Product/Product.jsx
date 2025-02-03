/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [discountedPrice, setDiscountedPrice] = useState(null);

  const image =
    product?.img.length > 73
      ? product?.img
      : product?.img.substr(23).replaceAll("\\", `/`).replaceAll(" ", "%20");

  useEffect(() => {
    if (product.discount) {
      setDiscountedPrice(
        (product.price * (1 - product.discount / 100)).toFixed(2)
      );
    }
  }, [product.price, product.discount]);

  return (
    <div className="flex flex-col w-full sm:w-48 md:w-56 lg:w-64 items-center my-3 mx-3 p-5 rounded-lg shadow-md hover:bg-slate-50 transition-colors duration-300">
      <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
        <img
          className="object-contain w-full h-full"
          src={image}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col items-center text-center my-2">
        <h3 className="text-opacity-50 opacity-50 pb-1">
          {product.subCategory.name}
        </h3>
        <h3 className="text-lg font-semibold mb-5">{product.name}</h3>
      </div>
      <div className="flex flex-col items-center mt-auto">
        <div className="flex items-center gap-2 mb-1">
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
        <Link
          to={`/products/${product.id}`}
          className="p-2 px-4 bg-brown rounded-3xl text-beige hover:bg-darkYellow transition-colors duration-300"
        >
          Consultar
        </Link>
      </div>
    </div>
  );
};

export default Product;
