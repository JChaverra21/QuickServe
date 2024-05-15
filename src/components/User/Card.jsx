import { useContext } from "react";
import CustomModal from "./CustomModal";
import { CartContext } from "../../context/CartContext";

const Card = () => {

  const { selectedGlasses, setSelectedGlasses, products } =
    useContext(CartContext);

  const openModal = (opcion) => {
    setSelectedGlasses(opcion);
  };

  const closeModal = () => {
    setSelectedGlasses(null);
  };

  /* products.forEach((product) => {
    product.ListaComplement.forEach((opcion) => {
      console.log(opcion.nombre_Componente);
    });
  }); */

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-2">
        {products.map((product) => (
          <div key={product._id.$oid} className="space-y-8">
            <h2 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900">
              {product.nombre_producto}
            </h2>
            {product.ListaOpciones.map((opcion, index) => (
              <div
                key={index} 
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 max-w-[23rem]"
                onClick={() => openModal(opcion)}
              >
                <img
                  className="object-cover w-full h-64 md:h-64 rounded-t-lg rounded-tr-lg md:rounded-none md:rounded-tl-lg md:rounded-tr-lg md:rounded-bl-lg md:rounded-br-lg"
                  src={`data:image/png;base64,${opcion.src}`}
                  alt={opcion.nombre_complemento}
                />
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                  <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                    {opcion.nombre_opcion}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700">
                    {opcion.descripcion_opcion}
                  </p>
                  <p className="mb-3 font-normal text-gray-700">
                    <strong>Precio: ${Number(opcion.precio_opcion).toLocaleString("es-CO")}</strong>
                    {/* {`Precio: $${Number(opcion.precio_opcion).toLocaleString('es-ES')}`} */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* <div className="grid gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-2">
        {ImagesGlasses.map((glasses) => (
          <div
            key={glasses.id}
            href="#"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 max-w-[23rem]"
            onClick={() => openModal(glasses)}
          >
            <img
              className="object-cover w-full h-64 md:h-64 rounded-t-lg rounded-tr-lg md:rounded-none md:rounded-tl-lg md:rounded-tr-lg md:rounded-bl-lg md:rounded-br-lg"
              src={glasses.src}
              alt={glasses.alt}
            />
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
              <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                {glasses.alt}
              </h5>
              <p className="mb-3 font-normal text-gray-700">
                {/* Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
                {glasses.description}
              </p>
            </div>
          </div>
        ))}
      </div> */}
      {selectedGlasses && (
        <div>
          <CustomModal
            isOpen={true} // Aquí puedes usar un estado o prop para manejar la apertura y cierre del modal
            onClose={closeModal}
            product={selectedGlasses}
            toppings={products}
            complements={products}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
