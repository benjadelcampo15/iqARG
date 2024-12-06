/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterBar = ({ filteredProducts, setDynamicSearchParams }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState([]);

  const createFiltersArray = (filteredProducts) => {
    const filtersGrouped = {};
    filteredProducts.forEach((product) => {
      // Iterate over each property of the product
      for (const property in product) {
        // If the property doesn't exist in filtersGrouped, initialize it as an empty array
        if (!filtersGrouped[property]) {
          filtersGrouped[property] = [];
        }

        // Add the property value to the array if it doesn't already exist
        if (!filtersGrouped[property].includes(product[property])) {
          filtersGrouped[property].push(product[property]);
        }
      }
    });
    // Convert the grouped filters object into an array of objects
    const filters = Object.entries(filtersGrouped).map(([key, value]) => ({
      [key]: value,
    }));

    return filters;
  };

  const handleFilters = (filterKey, filterValue) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(filterKey, filterValue);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    setFilters(createFiltersArray(filteredProducts));
  }, [filteredProducts]);

  useEffect(() => {
    const newParams = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });
    setDynamicSearchParams(newParams);
  }, [searchParams, setDynamicSearchParams]);

  return (
    <div className="flex flex-col gap-6 px-4 py-2 bg-beige rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-darkBrown mb-2">Filtros</h3>
      {filters.map((filter, index) => (
        <div key={index} className="flex flex-col gap-3">
          {Object.keys(filter).map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block font-semibold text-lg text-darkBrown mb-1"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <div className="flex flex-wrap gap-2">
                {filter[key].map((value, idx) => (
                  <button
                    key={idx}
                    className="px-3 py-1 border border-darkYellow bg-lightYellow rounded-md text-darkBrown hover:bg-darkYellow hover:text-white transition-all duration-200"
                    onClick={() => handleFilters(key, value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
