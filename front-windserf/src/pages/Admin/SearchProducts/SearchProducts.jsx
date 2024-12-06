import { useState } from "react";
import SearchBar from "./../../../components/SearchBar/SearchBar";
import { useProducts } from "../../../context/ProductContext";
import EditModal from "./EditModal";

const SearchProducts = () => {
  const { products, updateProduct } = useProducts();
  const [productSearch, setProductSearch] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  /* const [arrayValues, setArrayValues] = useState(null); */

  const handleSearch = (id) => {
    const product = products.find((p) => p.id === parseInt(id));
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
    //mandar la peticion put al back con el estado productSearch
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
      <section className="">
        <div className="min-w-30rem w-2/5 mt-14 place-self-center">
          <SearchBar onSearch={handleSearch} />
        </div>
        {productSearch && (
          <section className="">
            <div className="flex flex-row">
              <div className="w-2/5 h-2/5 overflow-hidden">
                <img
                  onClick={() => openModal("image")}
                  className="w-full h-full object-cover"
                  src={
                    /* "https://acdn.mitiendanube.com/stores/001/102/572/products/producto-tn-5-0f2c77b4c638fec31017256298586857-1024-1024.webp" */
                    productSearch.image
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col w-3/5">
                <h1
                  onClick={() => openModal("name")}
                  className="text-4xl font-bold mb-2"
                >
                  {productSearch.name}
                </h1>
                <h4
                  onClick={() => openModal("brand")}
                  className="text-2xl font-semibold text-gray mb-5"
                >
                  {productSearch.brand}
                </h4>
                <h2
                  onClick={() => openModal("price")}
                  className="text-4xl font-semibold text-brown mb-8"
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
                  <div
                    key={index}
                    onClick={() =>
                      openModal(property /* , dynamicProperties[property] */)
                    }
                  >
                    <label className="block text-xl font-semibold mb-2 capitalize z-0">
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
                <div className="w-2/3">
                  <h2 className="text-2xl font-semibold">Descripcion</h2>
                  <p onClick={() => openModal("description")}>
                    {productSearch.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        <button
          className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSubmit}
        >
          Guardar cambios
        </button>
      </section>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        field={currentField}
        value={productSearch ? productSearch[currentField] : ""}
        onSave={(newValue) => updateProductField(currentField, newValue)}
        /* arrayValues={arrayValues} */
      />
    </div>
  );
};

export default SearchProducts;
