import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const ProductsCardList = ({ product, ids, updates }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const [IdsCambios, setIdsCambios] = useState(new Set()); // Usar un conjunto para almacenar los IDs modificados

  const handleInputChange = (e, field, index, type) => {
    const { value, checked } = e.target;
    setEditedProduct((prevProduct) => {
      const updatedItems = [...prevProduct[type]];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]:
          field === "complemento_disponible" ? (checked ? "on" : "off") : value,
      };
      return {
        ...prevProduct,
        [type]: updatedItems,
      };
    });

    // Guardar el elemento cambiado, producto_id y _id en el conjunto
    const changedItemId = editedProduct[type][index]._id;
    if (!IdsCambios.has(changedItemId)) {
      setIdsCambios((prevIds) => new Set(prevIds.add(changedItemId))); // Añadir el ID al conjunto solo si no está presente
    }

      console.log("Elemento cambiado:", editedProduct[type][index]);
    console.log(IdsCambios)
    console.log(editedProduct);
  };
  const handleFileChange = (e, index, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target.result;
      setEditedProduct((prevProduct) => {
        const updatedItems = [...prevProduct[type]];
        updatedItems[index] = {
          ...updatedItems[index],
          src: src.split(",")[1], // Remove data URL scheme
        };
        return {
          ...prevProduct,
          [type]: updatedItems,
        };
      });
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">
          <input
            type="text"
            value={editedProduct.nombre_producto}
            onChange={(e) =>
              handleInputChange(e, "nombre_producto", null, null)
            }
            className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 w-full"
        >
          <span>Opciones ({editedProduct.ListaOpciones?.length || 0})</span>
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
        {isOpen && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Opciones:</h3>
            <ul>
              {editedProduct.ListaOpciones?.map((opcion, index) => (
                <li key={index} className="mb-2">
                  <input
                    type="text"
                    value={opcion.nombre_opcion}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "nombre_opcion",
                        index,
                        "ListaOpciones"
                      )
                    }
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={opcion.descripcion_opcion}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "descripcion_opcion",
                        index,
                        "ListaOpciones"
                      )
                    }
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="number"
                    value={opcion.precio_opcion}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "precio_opcion",
                        index,
                        "ListaOpciones"
                      )
                    }
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                  <img
                    src={`data:image/png;base64,${opcion.src}`}
                    alt={opcion.nombre_opcion}
                    className="w-24 h-24 object-cover mt-2"
                  />
                  <input
                    type="file"
                    name="src"
                    id="src"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) =>
                      handleFileChange(e, index, "ListaOpciones")
                    }
                    className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:text-sm"
                  />
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mb-2">Complementos:</h3>
            <ul>
              {editedProduct.ListaComplement?.map((complemento, index) => (
                <li key={index} className="mb-2">
                  <input
                    type="checkbox"
                    checked={complemento.complemento_disponible === "on"}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "complemento_disponible",
                        index,
                        "ListaComplement"
                      )
                    }
                    className="mr-2"
                  />
                  <input
                    type="text"
                    value={complemento.nombre_Componente}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "nombre_Componente",
                        index,
                        "ListaComplement"
                      )
                    }
                    className="mr-2"
                  />
                  <input
                    type="text"
                    value={complemento.descripcion}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "descripcion",
                        index,
                        "ListaComplement"
                      )
                    }
                    className="mr-2 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mb-2">Toppings:</h3>
            <ul>
              {editedProduct.ListaToppings?.map((topping, index) => (
                <li key={index} className="mb-2">
                  <input
                    type="text"
                    value={topping.nombre_topping}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "nombre_topping",
                        index,
                        "ListaToppings"
                      )
                    }
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={topping.descripcion_topping}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "descripcion_topping",
                        index,
                        "ListaToppings"
                      )
                    }
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="number"
                    value={topping.topping_precio}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "topping_precio",
                        index,
                        "ListaToppings"
                      )
                    }
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsCardList;
