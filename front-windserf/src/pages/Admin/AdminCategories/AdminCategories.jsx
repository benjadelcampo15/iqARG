import { useState } from "react";
import { useProducts } from "../../../context/ProductContext";
import ModalCategory from "./ModalCategory";
import ConfirmModal from "./ConfirmModal";

const AdminCategories = () => {
  const { categories, postCategory, deleteCategory } = useProducts();
  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategories, setCurrentSubCategories] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleNewCategory = () => {
    postCategory(newCategory);
    setNewCategory("");
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      setIsConfirmModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const openModal = (category) => {
    setCurrentCategory(category.name);
    setCurrentSubCategories(category.subCategories);
    setIsModalOpen(true);
  };

  const openConfirmModal = (category) => {
    setCategoryToDelete(category);
    setIsConfirmModalOpen(true);
  };

  return (
    <section className="mt-32 flex flex-col items-center gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-800 text-xl w-full max-w-md justify-between"
        >
          <button
            className="flex-grow text-left"
            onClick={() => openModal(category)}
          >
            {category.name}
          </button>
          <button
            className="text-red-500 hover:text-red-700 font-bold"
            onClick={() => openConfirmModal(category)}
            aria-label={`Eliminar categoría ${category.name}`}
          >
            ✕
          </button>
        </div>
      ))}
      <div className="flex gap-2 px-4 py-2 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-800 text-xl w-full max-w-md">
        <input
          className="flex-grow pl-2 text-black rounded-md"
          type="text"
          placeholder="Agregar nueva categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={handleNewCategory}
        >
          Agregar
        </button>
      </div>
      <ModalCategory
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={currentCategory}
        subCategories={currentSubCategories}
        setSubCategories={setCurrentSubCategories}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteCategory}
        title="¿Estás seguro?"
        message={`Si eliminas la categoria "${categoryToDelete?.name}" se eliminaran todas las subcategorias y productos relacionados`}
      />
    </section>
  );
};

export default AdminCategories;
