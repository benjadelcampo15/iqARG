import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createPortal } from "react-dom";

const FilterBar = ({ filteredProducts, setDynamicSearchParams }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [openFilter, setOpenFilter] = useState(null);
  const [filterPosition, setFilterPosition] = useState(null);
  const filterMenuRef = useRef(null);
  const buttonRef = useRef(null);

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
          if (!filtersGrouped[property]) {
            filtersGrouped[property] = new Set();
          }
          if (Array.isArray(product[property])) {
            product[property].forEach((value) =>
              filtersGrouped[property].add(value)
            );
          } else {
            filtersGrouped[property].add(product[property]);
          }
        }
      });
    });

    return Object.entries(filtersGrouped).map(([key, value]) => ({
      key,
      values: Array.from(value),
    }));
  };

  /*   const handleFilters = (filterKey, filterValue) => {
    filterValue = Array.isArray(filterValue) ? filterValue[0] : filterValue;

    const url = new URL(window.location.href);
    const newSearchParams = new URLSearchParams(url.search);

    const currentValues = searchParams.get(filterKey)?.split(",") || [];

    if (currentValues.includes(filterValue)) {
      newSearchParams.delete(filterKey);
      setActiveFilters(
        activeFilters.filter(
          (filter) => filter !== filterValue && filter !== filterKey
        )
      );
    } else {
      newSearchParams.append(filterKey, filterValue);
      setActiveFilters([...activeFilters, filterKey, filterValue]);
    }

    setSearchParams(newSearchParams);
  }; */

  const handleFilters = (filterKey, filterValue) => {
    if (Object.prototype.hasOwnProperty.call(activeFilters, filterKey)) {
      if (activeFilters[filterKey] === filterValue) {
        console.log("Lo borra por que es el mismo");

        delete activeFilters[filterKey];
        setSearchParams((prevParams) => {
          prevParams.delete(filterKey);
          return new URLSearchParams(prevParams);
        });
      } else {
        activeFilters[filterKey] = filterValue;
        setSearchParams((prevParams) => {
          prevParams.set(filterKey, filterValue);
          return new URLSearchParams(prevParams);
        });
      }
    } else {
      activeFilters[filterKey] = filterValue;
      setSearchParams((prevParams) => {
        prevParams.set(filterKey, filterValue);
        return new URLSearchParams(prevParams);
      });
    }

    /* const currentValues = searchParams.get(filterKey)?.split(",") || [];

    if (currentValues.includes(filterValue)) {
      // Deseleccionar el filtro si ya estaba activo
      setSearchParams((prevParams) => {
        prevParams.delete(filterKey);
        return new URLSearchParams(prevParams);
      });
      setActiveFilters(
        activeFilters.filter((filter) => filter !== filterValue)
      );
    } else {
      setSearchParams((prevParams) => {
        prevParams.set(filterKey, filterValue);
        return new URLSearchParams(prevParams);
      });
      setActiveFilters([...activeFilters, filterValue]);
    } */
  };

  const setFiltersOnce = useCallback(() => {
    setFilters(createFiltersArray(filteredProducts));
  }, []);

  useEffect(() => {
    setSearchParams(new URLSearchParams());
  }, []);

  useEffect(() => {
    setFiltersOnce();
  }, [setFiltersOnce]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      newParams[key] = value.split(",");
    });

    setDynamicSearchParams(newParams);
  }, [searchParams, setDynamicSearchParams]);

  const handleOpenFilter = (filterKey, buttonRef) => {
    if (openFilter === filterKey) {
      setOpenFilter(null);
      return;
    }

    const rect = buttonRef.getBoundingClientRect();
    setFilterPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });

    setOpenFilter(filterKey);
  };

  const handleClickOutside = (event) => {
    if (
      filterMenuRef.current &&
      !filterMenuRef.current.contains(event.target)
    ) {
      setOpenFilter(null);
    }
  };
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      const deltaX = Math.abs(touch.clientX - startX);
      const deltaY = Math.abs(touch.clientY - startY);

      // Detectar deslizamiento significativo (10px o más)
      if (deltaX > 10 || deltaY > 10) {
        setOpenFilter(null);
      }
    };

    if (openFilter !== null) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [openFilter]);

  return (
    <div className="w-3/4 sm:w-full p-3 sm:p-4 bg-beige rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-bold text-darkBrown mb-4 border-b pb-2">
        Filtros
      </h3>
      <div
        className={`flex ${
          isMobile ? "overflow-x-auto gap-3" : "flex-col gap-6"
        }`}
      >
        {filters.map((filter) => (
          <div key={filter.key} className="relative">
            {isMobile ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar conflicto con el evento del documento
                    handleOpenFilter(filter.key, e.currentTarget);
                  }}
                  className={`px-4 py-2 text-sm ${
                    activeFilters[filter.key]
                      ? "bg-yellow-600"
                      : "bg-darkYellow"
                  }  text-white rounded-md`}
                >
                  {activeFilters[filter.key]
                    ? activeFilters[filter.key]
                    : filter.key.charAt(0).toUpperCase() + filter.key.slice(1)}
                </button>

                {openFilter === filter.key &&
                  filterPosition &&
                  createPortal(
                    <div
                      ref={filterMenuRef}
                      className="absolute z-50 bg-white border border-slate-200 rounded-md shadow-lg mt-1"
                      style={{
                        position: "absolute",
                        top: filterPosition.top,
                        left: filterPosition.left,
                      }}
                    >
                      {filter.values.map((value, idx) => {
                        const isActive = activeFilters[filter.key] === value;
                        return (
                          <button
                            key={idx}
                            className={`block w-full px-3 py-1 text-left ${
                              isActive
                                ? "bg-darkYellow text-white"
                                : "hover:bg-lightYellow"
                            }`}
                            onClick={() => {
                              handleFilters(filter.key, value);
                              setOpenFilter(null);
                            }}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>,
                    document.body
                  )}
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <label className="block font-medium text-darkBrown mb-1">
                  {filter.key.charAt(0).toUpperCase() + filter.key.slice(1)}
                </label>
                <div className="flex flex-wrap gap-2">
                  {filter.values.map((value, idx) => {
                    const isActive = activeFilters.includes(value);
                    const shouldHide =
                      activeFilters.includes(filter.key) && !isActive;

                    return !shouldHide ? (
                      <button
                        key={idx}
                        className={`px-3 py-1 text-sm border border-darkYellow rounded-md transition-all duration-200 ${
                          isActive
                            ? "bg-darkYellow text-white"
                            : "bg-lightYellow text-darkBrown hover:bg-darkYellow hover:text-white"
                        }`}
                        onClick={() => handleFilters(filter.key, value)}
                      >
                        {value}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
