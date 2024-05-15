import React from "react";
import { toast } from "sonner";

function PrevProduct({ data, send , onback}) {
  const { nombre_producto, ListaOpciones, ListaComplement, ListaToppings } =
    data;
    console.log(data)
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{nombre_producto}</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Opciones:</h3>
          <ul>
            {Object.values(ListaOpciones).map((opcion, index) => (
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
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Complementos:</h3>
          <ul>
            {Object.values(ListaComplement).map((complemento, index) => (
              <li key={index} className="mb-2">
                <h4 className="text-md font-semibold">
                  {complemento.nombre_Componente}
                </h4>
                <p className="text-sm">{complemento.descripcion}</p>
                <p className="text-sm">
                  {complemento.complemento_disponible === "on"
                    ? "Disponible"
                    : "No disponible"}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Toppings:</h3>
          <ul>
            {Object.values(ListaToppings).map((topping, index) => (
              <li key={index} className="mb-2">
                <h4 className="text-md font-semibold">
                  {topping.nombre_topping}
                </h4>
                <p className="text-sm">Precio: ${topping.topping_precio}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        type="button"
        onClick={onback}
        className="inline-block bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Atras
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        type="button"
        onClick={() => toast.promise(send, {
          loading: 'Enviando...',
          success: 'Producto creado con éxito',
          error: 'Error al crear producto',
        
        })}
      >
        Enviar
      </button>
    </div>
  );
}

export default PrevProduct;
