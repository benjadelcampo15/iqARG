/* eslint-disable react/prop-types */
import { useEffect } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  // Efecto para desplazar hacia arriba cuando cambia la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]); // Se ejecuta cada vez que currentPage cambia

  return (
    <nav className="flex justify-center my-3 mt-10">
      <ul className="min-w-80 flex flex-row justify-between text-4xl text-gray-800">
        <li className="pt-1">
          <button
            className="rotate-180 hover:bg-slate-200 h-12 w-12 pb-1.5 rounded-full"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ➜
          </button>
        </li>
        <li>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              className={`px-4 py-2 rounded-xl ${
                i + 1 === currentPage ? "bg-slate-300 text-slate-800" : ""
              }`}
              key={i}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </li>
        <li>
          <button
            className="hover:bg-slate-200 mt-1 h-12 w-12 pb-1.5 rounded-full"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ➜
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
