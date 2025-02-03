import { useEffect, useState } from "react";
import OrderButton from "../../../components/OrderButton/OrderButton";
import FilterBar from "../../../components/FilterBar/FilterBar";
import { Link, useParams } from "react-router-dom";
import Product from "./../../../components/Product/Product";
import Pagination from "../../../components/Pagination/Pagination";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";
import { useProducts } from "../../../context/ProductContext";
import Loading from "./../../../components/Loading/Loading";
import {
  filterByCategory,
  filterByQuerys,
  sortProducts,
} from "../../../utils/filterFunctions";

const Products = () => {
  const [validUrl, setValidUrl] = useState(null);
  const { category, subCategory } = useParams();
  const { products, categories, subCategories, loading, error } = useProducts();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dynamicSearchParams, setDynamicSearchParams] = useState({});

  const isOutlet = category === "Outlet";

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    let categoryFormated = category.replace("-", " ");

    if (isOutlet) {
      setValidUrl(true);
    } else if (
      categories.length > 0 &&
      categories
        .map((cat) => cat.name)
        .includes(
          categoryFormated.charAt(0).toUpperCase() + categoryFormated.slice(1)
        )
    ) {
      if (
        (subCategory &&
          subCategories
            .map((subca) => subca.name)
            .includes(
              subCategory.charAt(0).toUpperCase() + subCategory.slice(1)
            )) ||
        subCategory === undefined
      ) {
        setValidUrl(true);
      } else {
        setValidUrl(false);
      }
    } else {
      setValidUrl(false);
    }
  }, [category, subCategory, categories, subCategories, isOutlet]);

  useEffect(() => {
    let productsToFilter = products;

    if (isOutlet) {
      productsToFilter = productsToFilter.filter((product) => product.discount);
    } else {
      productsToFilter = filterByCategory(
        productsToFilter,
        category,
        subCategory
      );
    }

    if (
      Object.keys(dynamicSearchParams).length > 1 ||
      (Object.keys(dynamicSearchParams).length > 0 &&
        !Object.prototype.hasOwnProperty.call(dynamicSearchParams, "sort"))
    ) {
      productsToFilter = filterByQuerys(productsToFilter, dynamicSearchParams);
    }

    if (dynamicSearchParams.sort) {
      productsToFilter = sortProducts(
        productsToFilter,
        dynamicSearchParams.sort
      );
    }

    setFilteredProducts(productsToFilter);

    /* productFiltering(); */
  }, [products, category, subCategory, dynamicSearchParams, isOutlet]);

  function onPageChange(newPage) {
    setCurrentPage(newPage);
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts =
    filteredProducts &&
    filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  if (!filteredProducts || filteredProducts.length === 0) {
    return <Loading message="Cargando productos..." />;
  }
  if (!validUrl) return <NotFoundPage />;

  return (
    <main className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 px-6 py-4">
      {/* Sidebar */}
      <aside className="flex flex-row sm:flex-col w-11/12 sm:w-1/4 box-content bg-beige rounded-lg pr-5 pl-3 py-3 sm:p-4 gap-1 sm:gap-0 shadow-md">
        <OrderButton setDynamicSearchParams={setDynamicSearchParams} />
        <FilterBar
          filteredProducts={filteredProducts}
          setDynamicSearchParams={setDynamicSearchParams}
        />
      </aside>

      <section className="flex flex-col items-center w-4/5">
        <div className="flex flex-row items-center justify-center gap-2 mb-4">
          <Link to="/" className="text-xl text-darkBrown hover:underline">
            Home
          </Link>
          <p className="text-xl text-darkBrown">{">"}</p>
          <Link
            className={`text-xl capitalize ${
              !subCategory ? "pointer-events-none cursor-not-allowed" : ""
            }`}
          >
            {category}
          </Link>
          {subCategory && (
            <>
              <p className="text-xl text-darkBrown">{">"}</p>
              <p className="text-xl capitalize">{subCategory}</p>
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-6 w-full">
          {currentProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </section>
    </main>
  );
};

export default Products;
