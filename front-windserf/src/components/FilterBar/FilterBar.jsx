/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const FilterBar = ({ filteredProducts, setDynamicSearchParams }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]); // Estado para los filtros activos

  const createFiltersArray = (filteredProducts) => {
    const allowedFilters = [
      "brand",
      "color",
      "measurement",
      "size",
      "material",
    ];
    const filtersGrouped = {};

    filteredProducts.forEach((product) => {
      allowedFilters.forEach((property) => {
        if (product[property]) {
          // Asegúrate de que filtersGrouped[property] sea un Set para evitar duplicados
          if (!filtersGrouped[property]) {
            filtersGrouped[property] = new Set();
          }

          // Si product[property] es un array, agrega cada valor al Set
          if (Array.isArray(product[property])) {
            product[property].forEach((value) =>
              filtersGrouped[property].add(value)
            );
          } else {
            // Si no es un array, simplemente agrega el valor
            filtersGrouped[property].add(product[property]);
          }
        }
      });
    });

    // Convierte los Sets de vuelta a arrays
    const filtersArray = Object.entries(filtersGrouped).map(([key, value]) => ({
      key,
      values: Array.from(value), // Convierte el Set a un array
    }));

    console.log("Filtros generados:", filtersArray);
    return filtersArray;
  };

  const handleFilters = (filterKey, filterValue) => {
    filterValue = Array.isArray(filterValue) ? filterValue[0] : filterValue;
    console.log("Search Params desde FilterBar: ", searchParams);
    console.log("FilterKey: ", filterKey);
    console.log("FilterValue: ", filterValue);

    const url = new URL(window.location.href);
    const newSearchParams = new URLSearchParams(url.search);

    const currentValues = searchParams.get(filterKey)?.split(",") || [];

    console.log("NewSearchParams: ", newSearchParams);
    console.log("SearchParams: ", searchParams);

    console.log("Current Values Before Modification:", currentValues);

    if (currentValues.includes(filterValue)) {
      //Eliminar el valor si esta seleccionado
      newSearchParams.delete(filterKey);
      setActiveFilters(
        activeFilters.filter(
          (filter) => filter !== filterValue && filter !== filterKey
        )
      );
    } else {
      newSearchParams.append(filterKey, filterValue);
      setActiveFilters([...activeFilters, filterKey, filterValue]);
      console.log([...activeFilters, filterKey, filterValue]);
    }

    console.log("New Search Params:", newSearchParams.toString());
    setSearchParams(newSearchParams); // Actualizar los parámetros de búsqueda
  };

  useEffect(() => {
    setFilters(createFiltersArray(filteredProducts));
  }, [filteredProducts]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const resultArray = [];
    params.forEach((value, key) => {
      resultArray.push(key, value);
    });
    setActiveFilters(resultArray);
  }, []);

  useEffect(() => {
    const newParams = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value.split(","); // Convierte a array
    });

    console.log("NewParams: ", newParams);

    setDynamicSearchParams(newParams);
  }, [searchParams, setDynamicSearchParams]);

  return (
    <div className="flex flex-col gap-6 p-4 bg-beige rounded-lg shadow-md w-full">
      <h3 className="text-xl font-bold text-darkBrown mb-4 border-b pb-2">
        Filtros
      </h3>
      {filters.map((filter) => (
        <div key={filter.key} className="flex flex-col gap-3">
          <label
            htmlFor={filter.key}
            className="block font-medium text-darkBrown mb-1"
          >
            {filter.key.charAt(0).toUpperCase() + filter.key.slice(1)}
          </label>
          <div className="flex flex-wrap gap-2">
            {filter.values.map((value, idx) => {
              const isActive = activeFilters.includes(value);
              if (isActive) {
                console.log(activeFilters);
                console.log(value);
                console.log(filter.key);
              }

              const shouldHide =
                activeFilters.includes(filter.key) && !isActive;

              return !shouldHide ? (
                <button
                  key={idx}
                  className={`px-3 py-1 text-sm border border-darkYellow rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-darkYellow text-white" // Filtro activo
                      : "bg-lightYellow text-darkBrown hover:bg-darkYellow hover:text-white" // Filtro inactivo
                  }`}
                  onClick={() => handleFilters(/* idx +  */ filter.key, value)}
                >
                  {value}
                </button>
              ) : null; // Ocultar el botón si el filtro está activo y no es el actual
            })}
          </div>
        </div>
      ))}
    </div>
  );

  /* return (
    <div className="flex flex-col gap-6 p-4 bg-beige rounded-lg shadow-md w-full">
      <h3 className="text-xl font-bold text-darkBrown mb-4 border-b pb-2">
        Filtros
      </h3>
      {filters.map((filter) => (
        <div key={filter.key} className="flex flex-col gap-3">
          <label
            htmlFor={filter.key}
            className="block font-medium text-darkBrown mb-1"
          >
            {filter.key.charAt(0).toUpperCase() + filter.key.slice(1)}
          </label>
          <div className="flex flex-wrap gap-2">
            {filter.values.map((value, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 text-sm border border-darkYellow rounded-md transition-all duration-200 ${
                  searchParams.has(filter.key) &&
                  searchParams.get(filter.key).split(",").includes(value)
                    ? "bg-darkYellow text-white" // Filtro activo
                    : "bg-lightYellow text-darkBrown hover:bg-darkYellow hover:text-white" // Filtro inactivo
                }`}
                onClick={() => handleFilters(filter.key, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ); */
};

export default FilterBar;
