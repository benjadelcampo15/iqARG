/* eslint-disable react/prop-types */
import { useState } from "react";

const EditModal = ({
  isOpen,
  onClose,
  field,
  value,
  onSave /* , arrayValues */,
}) => {
  const [inputValue, setInputValue] = useState(value);
  /* const [newArrayValues, setNewArrayValues] = useState(arrayValues || []); */
  const [newArrayValue, setNewArrayValue] = useState("");

  //Puedo analizar si ya con la variable value puedo verificar si value es un array o no
  //y no haria falta nada de arrayValues
  //Y ahi solo deberia manipular el esta inputValue
  //por lo tanto tambien seria inutil newArrayValues, CREO!

  const handleDeleteValue = (index) => {
    /* setNewArrayValues(arrayValues.filter((_, i) => i !== index)); */
    setInputValue(value.filter((_, i) => i !== index));
  };

  const handleAddValue = () => {
    if (newArrayValue.trim()) {
      setInputValue([...value, newArrayValue.trim()]);
      /* setNewArrayValues([...arrayValues, newArrayValue.trim()]); */
      setNewArrayValue("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Editar {field}</h2>
        {Array.isArray(value) ? (
          <div>
            <ul className="mb-4">
              {value.map((val, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="text-gray-700">{val}</span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteValue(index)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={newArrayValue}
                onChange={(e) => setNewArrayValue(e.target.value)}
                placeholder="Agregar nuevo valor"
              />
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleAddValue}
              >
                Agregar
              </button>
            </div>
          </div>
        ) : (
          <input
            type={
              field === "discount"
                ? "number"
                : field === "image"
                ? "file"
                : "text"
            }
            className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            value={inputValue}
            onChange={(e) =>
              setInputValue(
                field === "discount"
                  ? parseFloat(e.target.value) || 0
                  : e.target.value
              )
            }
            placeholder={
              field === "discount" ? "Ingrese el porcentaje de descuento" : ""
            }
          />
        )}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              onSave(inputValue);
              onClose();
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
