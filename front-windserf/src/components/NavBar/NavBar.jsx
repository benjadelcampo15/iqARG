import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Categories from "../Categories/Categories";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSearch = (id) => {
    navigate(`products/${id}`);
  };

  return (
    <div className="flex flex-row justify-between items-center py-9 px-2 bg-brown">
      <Link to="/">
        <h1 className="text-red-500 ml-4 text-beige">Logo</h1>
      </Link>
      <div className="z-10 w-28rem h-10 relative">
        <div className="absolute w-full">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <Categories />
    </div>
  );
};

export default NavBar;
