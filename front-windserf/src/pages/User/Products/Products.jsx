import { useEffect, useState } from "react";
import OrderButton from "../../../components/OrderButton/OrderButton";
import FilterBar from "../../../components/FilterBar/FilterBar";
import { Link, useParams } from "react-router-dom";
import Product from "./../../../components/Product/Product";
import Pagination from "../../../components/Pagination/Pagination";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";
import { useProducts } from "../../../context/ProductContext";
import {
  filterByCategory,
  filterByQuerys,
  sortProducts,
} from "../../../utils/filterFunctions";

const Products = () => {
  const [validUrl, setValidUrl] = useState(null);
  const { category, subCategory } = useParams();
  const { products, categories, subcategories } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dynamicSearchParams, setDynamicSearchParams] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    filteredProducts &&
    filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    if (
      categories
        .map((cat) => cat.name)
        .includes(category.charAt(0).toUpperCase() + category.slice(1))
    ) {
      if (
        subcategories
          .map((subca) => subca.name)
          .includes(
            subCategory.charAt(0).toUpperCase() + subCategory.slice(1)
          ) ||
        subCategory === undefined
      ) {
        setValidUrl(true);
      } else {
        setValidUrl(false);
      }
    } else {
      setValidUrl(false);
    }
  }, [category, subCategory, categories, subcategories]);

  useEffect(() => {
    setFilteredProducts(filterByCategory(products, category, subCategory));
  }, [category, subCategory, products]);

  useEffect(() => {
    setFilteredProducts((prevFilteredProducts) =>
      filterByQuerys(prevFilteredProducts, dynamicSearchParams)
    );
    if (Object.keys(dynamicSearchParams).includes("sort")) {
      setFilteredProducts((prevFilteredProducts) =>
        sortProducts(prevFilteredProducts, dynamicSearchParams.sort)
      );
    }
  }, [dynamicSearchParams]);

  function onPageChange(newPage) {
    setCurrentPage(newPage);
  }

  if (!validUrl) return <NotFoundPage />;

  return (
    <main className="flex flex-row ">
      <div className="flex flex-col w-1/10 pl-4 pr-1 py-1 mr-8 bg-beige">
        <OrderButton setDynamicSearchParams={setDynamicSearchParams} />
        <FilterBar
          filteredProducts={filteredProducts}
          setDynamicSearchParams={setDynamicSearchParams}
        />
      </div>
      <section className="flex flex-col items-center w-5/6 mt-2 mx-auto">
        <div className="flex flex-row items-center justify-center">
          <Link to="/" className="text-xl">
            Home
          </Link>
          <p className="text-xl mx-1 pointer-events-none">{">"}</p>
          <Link
            className={`text-xl capitalize ${
              !subCategory ? "pointer-events-none cursor-not-allowed" : ""
            }`}
          >
            {category}
          </Link>
          {subCategory ? (
            <p className="text-xl mx-1 pointer-events-none">{">"}</p>
          ) : null}
          {subCategory ? (
            <p className="text-xl capitalize pointer-events-none">
              {subCategory}
            </p>
          ) : null}
        </div>
        <div className="flex  justify-center w-full">
          <div className="flex flex-wrap mt-5 w-11/12 gap-x-8">
            {currentProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
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
