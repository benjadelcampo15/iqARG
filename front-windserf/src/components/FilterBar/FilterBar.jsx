import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const FilterBar = () => {
  const { category, subCategory } = useParams();
  /* const filters = "handleFilters()"; */
  const filters = [
    { Marca: ["Fanatic", "Ion", "Bic", "Dakine"] },
    { Medida: [4.0, 4.2, 4.4, 4.6] },
    { Material: ["Aluminio", "Carbono"] },
  ];

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
