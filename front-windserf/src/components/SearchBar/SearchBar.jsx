import React from "react";
import lupa from "../../assets/lupa.png";

const SearchBar = () => {
  return (
    <div className="flex max-w-full bg-beige p-2 rounded-full text-sm md:text-base justify-between">
      <input
        className="bg-beige border-0 outline-0 pl-2"
        type="text"
        placeholder="Buscar"
      />
      <div className="w-4 h-4 mt-1 mr-1">
        <img src={lupa} className="w" alt="" />
      </div>
    </div>
  );
};

export default SearchBar;
