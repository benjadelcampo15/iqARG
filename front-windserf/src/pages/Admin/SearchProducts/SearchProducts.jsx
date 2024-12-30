import { useState } from "react";
import SearchBar from "./../../../components/SearchBar/SearchBar";
import { useProducts } from "../../../context/ProductContext";
import EditModal from "./EditModal";

const SearchProducts = () => {
  const { products, updateProduct, deleteProduct } = useProducts();
  const [productSearch, setProductSearch] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  /* const [arrayValues, setArrayValues] = useState(null); */

  const handleSearch = (id) => {
    const product = products.find((p) => p.id === id);
    setProductSearch(product);
  };

  const openModal = (field /* , arrayValues */) => {
    setCurrentField(field);
    setIsModalOpen(true);
    /* setArrayValues(arrayValues); */
  };

  const updateProductField = (field, newValue) => {
    setProductSearch((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const handleSubmit = () => {
    updateProduct(productSearch.id, productSearch);
  };

  const handleDeleteProduct = () => {
    if (productSearch) {
      const confirmDelete = window.confirm(
        `¿Estás seguro de que quieres eliminar el producto "${productSearch.name}"?`
      );
      if (confirmDelete) {
        deleteProduct(productSearch.id);
        /* setProductSearch(undefined); */
      }
    }
  };

  function getDynamicProperties(product) {
    const dynamicProperties = {};

    for (const property in product) {
      if (Array.isArray(product[property]) && product[property].length > 1) {
        dynamicProperties[property] = product[property];
      }
    }

    return dynamicProperties;
  }

  const dynamicProperties = getDynamicProperties(productSearch);

  return (
    <div>
      <section className="flex flex-col items-center">
        <div className="min-w-30rem w-2/5 mt-14 place-self-center">
          <SearchBar onSearch={handleSearch} />
        </div>
        {productSearch && (
          <section className="mt-10">
            <div className="flex flex-row">
              <div className="w-2/5 h-2/5 overflow-hidden">
                <img
                  onClick={() => openModal("image")}
                  className="w-full h-full object-cover cursor-pointer"
                  src={productSearch.img}
                  alt=""
                />
              </div>
              <div className="flex flex-col w-3/5">
                <h1
                  onClick={() => openModal("name")}
                  className="text-4xl font-bold mb-2 cursor-pointer"
                >
                  {productSearch.name}
                </h1>
                <h4
                  onClick={() => openModal("brand")}
                  className="text-2xl font-semibold text-gray mb-5 cursor-pointer"
                >
                  {productSearch.brand}
                </h4>
                <h2
                  onClick={() => openModal("price")}
                  className="text-4xl font-semibold text-brown mb-8 cursor-pointer"
                >
                  {`$${productSearch.price}`}
                </h2>
                <h3
                  onClick={() => openModal("discount")}
                  className="text-2xl font-semibold text-green-500 mb-5 cursor-pointer"
                >
                  {`Descuento: ${productSearch.discount || 0}%`}
                </h3>
                {Object.keys(dynamicProperties).map((property, index) => (
                  <div key={index} onClick={() => openModal(property)}>
                    <label className="block text-xl font-semibold mb-2 capitalize z-0 cursor-pointer">
                      {property}
                    </label>
                    <div className="relative inline-block text-left">
                      <button className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Seleccionar
                      </button>
                    </div>
                  </div>
                ))}
                <button className="w-auto self-start mt-16 mb-6 py-2 px-20 border rounded-lg bg-lightYellow border-lightYellow hover:bg-darkYellow hover:border-darkYellow">
                  Consultar disponibilidad
                </button>
                <div className="w-2/3 cursor-pointer">
                  <h2 className="text-2xl font-semibold">Descripción</h2>
                  <p onClick={() => openModal("description")}>
                    {productSearch.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        {productSearch && (
          <div className="flex gap-4 mt-16">
            <button
              className="w-40 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Guardar cambios
            </button>
            <button
              className="w-40 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleDeleteProduct}
            >
              Eliminar producto
            </button>
          </div>
        )}
      </section>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        field={currentField}
        value={productSearch ? productSearch[currentField] : ""}
        onSave={(newValue) => updateProductField(currentField, newValue)}
      />
    </div>
  );
};

export default SearchProducts;
