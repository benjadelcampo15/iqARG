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
    <div className="flex flex-col">
      {filters.map((filter, index) => (
        <div className="" key={index}>
          {Object.keys(filter).map((key) => (
            <div key={key} className="my-3 mx-3">
              <label htmlFor={key} className="block font-bold text-lg ">
                {key}
              </label>
              {filter[key].map((value, index) => (
                <button
                  key={index}
                  className="border rounded-md px-1 mr-3 my-1"
                  onClick={() => {
                    handleFilters(key, value);
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
