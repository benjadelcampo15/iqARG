import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

const Categories = () => {
  const { categories } = useProducts();
  return (
    <div className="flex flex-row mr-6 text-beige z-20">
      {categories.map((category) => (
        <div key={category.name} className="relative group">
          <Link to={`/${category.name}`}>
            <h2 className="mx-6 font-open_sans">{category.name}</h2>
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out scale-y-0 origin-top group-hover:scale-y-100">
            <div className="py-1">
              {category.subCategories.map((subcategory) => (
                <Link
                  key={subcategory.name}
                  to={`/${category.name}/${subcategory.name}`}
                  className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
                >
                  {subcategory.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    /* <div className="flex flex-row mr-6 text-beige z-20">
      <div className="relative group">
        <Link to="windsurf">
          <h2 className="mx-6 font-open_sans">WindSurf</h2>
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out scale-y-0 origin-top group-hover:scale-y-100">
          <div className="py-1">
            <Link
              to="windsurf/tablas"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Tablas
            </Link>
            <Link
              to="windsurf/velas"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Velas
            </Link>
            <Link
              to="windsurf/mastiles"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Mastiles
            </Link>
            <Link
              to="windsurf/estrellas"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Estrellas
            </Link>
            <Link
              to="windsurf/extensores"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Extensores
            </Link>
            <Link
              to="windsurf/botavaras"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Botavaras
            </Link>
            <Link
              to="windsurf/accesorios-y-repuestos"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Accesorios y repuestos
            </Link>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Link to="/foil">
          <h2 className="mx-6 font-open_sans">Foil</h2>
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out scale-y-0 origin-top group-hover:scale-y-100">
          <div className="py-1">
            <Link
              to="/foil/foil-completos"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Foil completos
            </Link>
            <Link
              to="/foil/mastiles-y-fuselajes"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Mastiles y fuselajes
            </Link>
            <Link
              to="/foil/alas"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Alas
            </Link>
            <Link
              to="/foil/accesorios-y-repuestos"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Accesorios y repuestos
            </Link>
          </div>
        </div>
      </div>

      <div className="relative group">
        <Link to="/wing-foil">
          <h2 className="mx-6 font-open_sans">Wing Foil</h2>
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out scale-y-0 origin-top group-hover:scale-y-100">
          <div className="py-1">
            <Link
              to="/wing-foil/wings"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Wings
            </Link>
            <Link
              to="/wing-foil/tablas"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Tablas
            </Link>
            <Link
              to="/wing-foil/boomstraps"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Boomstraps
            </Link>
            <Link
              to="/wing-foil/accesorios-y-repuestos"
              className="block px-4 py-2 text-sm text-brown hover:bg-slate-50"
            >
              Accesorios y repuestos
            </Link>
          </div>
        </div>
      </div>
    </div> */
  );
};

export default Categories;
