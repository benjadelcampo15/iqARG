import React, { useEffect, useState } from "react";
import OrderButton from "../../components/OrderButton/OrderButton";
import FilterBar from "../../components/FilterBar/FilterBar";
import { Link, useParams } from "react-router-dom";
import Product from "./../../components/Product/Product";

const Products = () => {
  const [validUrl, setValidUrl] = useState(null);
  const { category, subCategory } = useParams();

  useEffect(() => {
    if (["windsurf", "foil", "wing-foil"].includes(category)) {
      if (
        ["Aca debe ir el array con todas las subCategory", undefined].includes(
          subCategory
        )
      ) {
        setValidUrl(true);
      } else {
        setValidUrl(false);
      }
    } else {
      setValidUrl(false);
    }
  }, [category, subCategory]);
  /* const subCategory = "Velas";
  const category = "Foil"; */
  return (
    <main className="">
      <div className="flex flex-row justify-center mr-28">
        <Link to="/" className="text-xl">
          Home
        </Link>
        <p className="text-xl mx-1">{">"}</p>
        <Link className="text-xl">{category}</Link>
        {subCategory ? <p className="text-xl mx-1">{">"}</p> : null}
        {subCategory ? <p className="text-xl">{subCategory}</p> : null}
      </div>
      <section className="flex flex-row mr-28">
        <div className="flex flex-col w-1/6 pl-4 py-1 bg-beige">
          <OrderButton />
          <FilterBar />
        </div>
        <div className="flex flex-wrap w-4/5 ml-10 mt-5">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </section>
    </main>
  );
};

export default Products;
