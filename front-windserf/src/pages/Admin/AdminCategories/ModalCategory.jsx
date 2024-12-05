/* eslint-disable react/prop-types */

import { useState } from "react";
import { useProducts } from "../../../context/ProductContext";

const ModalCategory = ({ category, subCategories, setSubCategories }) => {
  const { postSubCategory, deleteSubCategory } = useProducts();
  const [newSubCategory, setNewSubCategory] = useState("");

  const handleDeleteSubCategory = (id) => {
    deleteSubCategory(id);
    setSubCategories(
      subCategories.filter((subCategory) => {
        return subCategory.id !== id;
      })
    );
  };

  const handleNewSubcategory = () => {
    postSubCategory(newSubCategory);
    setNewSubCategory("");
  };

  return (
    <div className="mt-32 flex flex-col items-center gap-4">
      <h2>{category}</h2>
      <ul>
        {subCategories.map((subCategory) => (
          <li
            className="flex justify-between items-center mb-2"
            key={subCategory.id}
          >
            <span className="text-gray-700">{subCategory.name}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeleteSubCategory(subCategory.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
        <li className="flex justify-between items-center mb-2">
          <input
            type="text"
            placeholder="Agregar nueva categoria"
            value={newSubCategory}
            onChange={(e) => setNewSubCategory(e.target.value)}
          />
          <button onClick={handleNewSubcategory}>Agregar</button>
        </li>
      </ul>
    </div>
  );
};

export default ModalCategory;
