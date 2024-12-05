import { useState } from "react";
import { useProducts } from "../../../context/ProductContext";
import ModalCategory from "./ModalCategory";

const AdminCategories = () => {
  const { categories, postCategory } = useProducts();
  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategories, setCurrentSubCategories] = useState([]);

  const handleNewCategory = () => {
    postCategory(newCategory);
    setNewCategory("");
  };

  const openModal = (category) => {
    setCurrentCategory(category.name);
    setCurrentSubCategories(category.subCategories);
    setIsModalOpen(true);
  };

  return (
    <section className="mt-32 flex flex-col items-center gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-800 text-xl"
          onClick={() => openModal(category)}
        >
          {category.name}
        </button>
      ))}
      <div className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-800 text-xl">
        <input
          type="text"
          placeholder="Agregar nueva categoria"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleNewCategory}>Agregar</button>
      </div>
      <ModalCategory
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={currentCategory}
        subCategories={currentSubCategories}
        setSubCategories={setCurrentSubCategories}
      />
    </section>
  );
};

export default AdminCategories;
