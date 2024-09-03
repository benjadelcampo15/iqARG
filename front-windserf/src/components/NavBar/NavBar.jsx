import React from "react";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  return (
    <div className="flex flex-row text-black">
      <h1>Logo</h1>
      <div>
        <SearchBar />
      </div>
      <div>
        <h2>WindSurf</h2>
        <h2>Foil</h2>
        <h2>Wing Foil</h2>
      </div>
    </div>
  );
};

export default NavBar;
