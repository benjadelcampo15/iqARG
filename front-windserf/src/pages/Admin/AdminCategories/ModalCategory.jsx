/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useProducts } from "../../../context/ProductContext";

const ModalCategory = ({
  isOpen,
  onClose,
  category,
  /* subCategories */
  setSubCategories,
}) => {
  const { subCategories, postSubCategory, deleteSubCategory } = useProducts();
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState("");

  useEffect(() => {
    setFilteredSubCategories(
      subCategories.filter((subCategory) => {
        return subCategory.category.name === category;
      })
    );
  }, [category, subCategories]);

  const handleDeleteSubCategory = (id) => {
    deleteSubCategory(id);
    /* setSubCategories(
      subCategories.filter((subCategory) => subCategory.id !== id)
    ); */
  };

  const handleNewSubcategory = () => {
    console.log(newSubCategory);

    postSubCategory(category, newSubCategory);
    setNewSubCategory("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-beige p-8 rounded-lg shadow-lg w-96">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">{category}</h2>
        <ul className="space-y-4">
          {filteredSubCategories.map((subCategory) => (
            <li
              key={subCategory.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-md shadow-sm"
            >
              <span className="text-gray-800">{subCategory.name}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteSubCategory(subCategory.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
          <li className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Nueva subcategoría"
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleNewSubcategory}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
            >
              Agregar
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModalCategory;
