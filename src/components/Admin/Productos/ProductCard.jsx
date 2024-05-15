import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const ProductCard = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.nombre_producto}</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 w-full"
        >
          <span>Opciones ({Object.values(product.ListaOpciones).length})</span>
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
              {Object.values(product.ListaOpciones).map((opcion, index) => (
                <li key={index} className="mb-2">
                  <h4 className="text-md font-semibold">
                    {opcion.nombre_opcion}
                  </h4>
                  <p className="text-sm">{opcion.descripcion_opcion}</p>
                  <p className="text-sm">Precio: ${opcion.precio_opcion}</p>
                  <img
                    src={`data:image/png;base64,${opcion.src}`}
                    alt={opcion.nombre_opcion}
                    className="w-24 h-24 object-cover mt-2"
                  />
                </li>
              ))}
            </ul>
            {product.ListaComplementos && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Complementos:</h3>
                <ul>
                  {Object.values(product.ListaComplementos).map((complemento, index) => (
                    <li key={index} className="mb-2">
                      <h4 className="text-md font-semibold">
                        {complemento.nombre_complemento}
                      </h4>
                      <p className="text-sm">{complemento.descripcion_complemento}</p>
                      <p className="text-sm">Precio: ${complemento.precio_complemento}</p>
                      <img
                        src={`data:image/png;base64,${complemento.src}`}
                        alt={complemento.nombre_complemento}
                        className="w-24 h-24 object-cover mt-2"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.ListaToppings && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Toppings:</h3>
                <ul>
                  {Object.values(product.ListaToppings).map((topping, index) => (
                    <li key={index} className="mb-2">
                      <h4 className="text-md font-semibold">
                        {topping.nombre_topping}
                      </h4>
                      <p className="text-sm">{topping.descripcion_topping}</p>
                      <p className="text-sm">Precio: ${topping.topping_precio}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
