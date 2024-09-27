import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="flex flex-row mr-6 text-beige">
      <div className="relative group">
        <Link to="products/windsurf">
          <h2 className="mx-6 font-open_sans">WindSurf</h2>
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out scale-y-0 origin-top group-hover:scale-y-100">
          <div className="py-1">
            <Link
              to="products/windsurf/tablas"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Tablas
            </Link>
            <Link
              to="products/windsurf/velas"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Velas
            </Link>
            <Link
              to="products/windsurf/mastiles"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Mastiles
            </Link>
            <Link
              to="products/windsurf/estrellas"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Estrellas
            </Link>
            <Link
              to="products/windsurf/extensores"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Extensores
            </Link>
            <Link
              to="products/windsurf/botavaras"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Botavaras
            </Link>
            <Link
              to="products/windsurf/accesorios-y-repuestos"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Accesorios y repuestos
            </Link>
          </div>
        </div>
      </div>

      {/* Foil Dropdown */}
      <div className="relative group">
        <Link to="products/foil">
          <h2 className="mx-6 font-open_sans">Foil</h2>
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out scale-y-0 origin-top group-hover:scale-y-100">
          <div className="py-1">
            <Link
              to="products/foil/foil-completos"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Foil completos
            </Link>
            <Link
              to="products/foil/mastiles-y-fuselajes"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Mastiles y fuselajes
            </Link>
            <Link
              to="products/foil/alas"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Alas
            </Link>
            <Link
              to="products/foil/accesorios-y-repuestos"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Accesorios y repuestos
            </Link>
          </div>
        </div>
      </div>

      {/* Wing Foil Dropdown */}
      <div className="relative group">
        <Link to="products/wing-foil">
          <h2 className="mx-6 font-open_sans">Wing Foil</h2>
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out scale-y-0 origin-top group-hover:scale-y-100">
          <div className="py-1">
            <Link
              to="products/wing-foil/wings"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Wings
            </Link>
            <Link
              to="products/wing-foil/tablas"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Tablas
            </Link>
            <Link
              to="products/wing-foil/boomstraps"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Boomstraps
            </Link>
            <Link
              to="products/wing-foil/accesorios-y-repuestos"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Accesorios y repuestos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
