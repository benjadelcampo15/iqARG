import { useState } from "react";
import { useProducts } from "../../../context/ProductContext";

const CreateProduct = () => {
  const { categories, postProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: 0,
    stock: 0,
    description: "",
    img: null,
    category: "",
    subCategory: "",
  });
  const [selectedCharacteristic, setSelectedCharacteristic] = useState("");
  const [option, setOption] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Image = reader.result;
        console.log("Base64 Image:", base64Image);

        setFormData({ ...formData, img: base64Image });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (categoryName) => {
    setFormData({ ...formData, category: categoryName, subCategory: "" });
  };

  const handleSubcategoryChange = (subcategoryName) => {
    setFormData({ ...formData, subCategory: subcategoryName });
  };

  // Agrega una opción a una característica específica
  const addOptionToCharacteristic = () => {
    if (selectedCharacteristic && option) {
      setFormData({
        ...formData,
        [selectedCharacteristic]: formData[selectedCharacteristic]
          ? [...formData[selectedCharacteristic], option]
          : [option],
      });
      setOption("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del producto:", formData);
    postProduct(formData);
    setFormData({
      name: "",
      brand: "",
      price: 0,
      stock: 0,
      description: "",
      img: null,
      category: "",
      subCategory: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Crear Producto</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Categoría *</label>
        <select
          value={formData.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="" disabled>
            Seleccionar categoría
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {formData.category && (
        <div className="mb-4">
          <label className="block text-sm font-medium">Subcategoría *</label>
          <select
            value={formData.subCategory}
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="" disabled>
              {formData.subCategory
                ? formData.subCategory
                : "Seleccionar subcategoría"}
            </option>
            {categories
              .find((category) => category.name === formData.category)
              ?.subCategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.name}>
                  {subcategory.name}
                </option>
              ))}
          </select>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Nombre del Producto *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Marca *</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Precio *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Descripción *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          rows="4"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Imagen *</label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="border p-2 w-full"
          required
        />
      </div>
      {/* Características opcionales */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Características Opcionales</h3>
        <select
          value={selectedCharacteristic}
          onChange={(e) => setSelectedCharacteristic(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          <option value="" disabled>
            Seleccionar característica
          </option>
          <option value="color">Color</option>
          <option value="material">Material</option>
          <option value="size">Tamaño</option>
          <option value="measurement">Medidas</option>
        </select>

        {selectedCharacteristic && (
          <div>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => setOption(e.target.value)}
                placeholder={`Agregar opción para ${selectedCharacteristic}`}
                className="border p-2 flex-1"
              />
              <button
                type="button"
                onClick={addOptionToCharacteristic}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Agregar
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {formData[selectedCharacteristic]?.map((opt, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 px-2 py-1 rounded text-sm"
                >
                  {opt}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-indigo-500 text-white px-4 py-2 rounded mt-4"
      >
        Crear Producto
      </button>
    </form>
  );
};

export default CreateProduct;
