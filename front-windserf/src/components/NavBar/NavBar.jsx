import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Categories from "../Categories/Categories";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex flex-row justify-between align-middle py-9 px-2 bg-brown">
      <Link to="/">
        <h1 className="text-red-500 ml-4 text-beige">Logo</h1>
      </Link>
      <div className="w-96 ml-36">
        <SearchBar />
      </div>
      <Categories />
      {/* <div className="flex flex-row mr-6 text-beige">
        <button>
          <h2 className="mx-5 font-open_sans">WindSurf</h2>
        </button>
        <button>
          <h2 className="mx-5 font-open_sans">Foil</h2>
        </button>
        <button>
          <h2 className="mx-5 font-open_sans">Wing Foil</h2>
        </button>
      </div> */}
    </div>
  );
};

export default NavBar;
