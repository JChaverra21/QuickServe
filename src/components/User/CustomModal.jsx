/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AddCart } from "../../Icons/AddCart";
import { DeleteIcon } from "../../Icons/DeleteIcon";

const CustomModal = ({ isOpen, onClose, product, toppings, complements }) => {
  const { onOpenChange } = useDisclosure();

  const { addCartItem } = useContext(CartContext);

  const complementsId = complements.map((complement) => complement._id.$oid);

  const filteredComplements = complements.map(
    (complement) => complement.ListaComplement
  );

  //const toppingsId = toppings.map((topping) => topping._id.$oid);

  const filteredToppings = toppings.map((topping) => topping.ListaToppings);

  // Agregar complementos
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event, opcion) => {
    if (event.target.checked) {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [opcion._id.$oid]: opcion,
      }));
    } else {
      setSelectedOptions((prevOptions) => {
        const newOptions = { ...prevOptions };
        delete newOptions[opcion._id.$oid];
        return newOptions;
      });
    }
  };

  console.log(selectedOptions);

  // Agregar toppings
  const [selectedToppings, setSelectedToppings] = useState([]);

  const addToppings = (topping) => {
    const exist = selectedToppings.find(
      (selectedTopping) => selectedTopping._id.$oid === topping._id.$oid
    );
    if (exist) {
      setSelectedToppings(
        selectedToppings.map((selectedTopping) =>
          selectedTopping._id.$oid === topping._id.$oid
            ? {
                ...exist,
                qty: exist.qty + 1,
                totalPrice: (exist.qty + 1) * Number(topping.topping_precio),
              }
            : selectedTopping
        )
      );
    } else {
      setSelectedToppings([
        ...selectedToppings,
        { ...topping, qty: 1, totalPrice: Number(topping.topping_precio) },
      ]);
    }
  };

  // Eliminar toppings
  const removeToppings = (topping) => {
    const exist = selectedToppings.find(
      (selectedTopping) => selectedTopping._id.$oid === topping._id.$oid
    );
    if (exist && exist.qty > 1) {
      setSelectedToppings(
        selectedToppings.map((selectedTopping) =>
          selectedTopping._id.$oid === topping._id.$oid
            ? {
                ...exist,
                qty: exist.qty - 1,
                totalPrice: (exist.qty - 1) * Number(topping.topping_precio),
              }
            : selectedTopping
        )
      );
    } else {
      setSelectedToppings(
        selectedToppings.filter(
          (selectedTopping) => selectedTopping._id.$oid !== topping._id.$oid
        )
      );
    }
  };

  // Total de toppings
  const totalToppings = selectedToppings.reduce(
    (total, topping) => total + topping.totalPrice,
    0
  );

  // Precio total
  const totalPrice = Number(product.precio_opcion) + Number(totalToppings);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"2xl"}
      style={{ maxWidth: "900px" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h4>{product.nombre_opcion}</h4>
            </ModalHeader>
            <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
              <div>
                <img
                  className="rounded-lg"
                  src={`data:image/png;base64,${product.src}`}
                  alt={product.nombre_opcion}
                />
                <p className="mt-2">{product.descripcion_opcion}</p>

                <div className="flex flex-col gap-2">
                  {filteredComplements.some((complement) =>
                    complement.some(
                      (opcion) =>
                        product.producto_id.$oid === opcion.producto_id.$oid
                    )
                  ) && <h5 className="font-semibold mt-4">Complementos</h5>}

                  {filteredComplements.map((complement) => {
                    return complement.map((opcion) => {
                      if (
                        opcion.producto_id.$oid === product.producto_id.$oid
                      ) {
                        if (opcion.complemento_disponible === "on") {
                          return (
                            <label key={opcion._id.$oid}>
                              <input
                                type="checkbox"
                                value={opcion._id.$oid}
                                onChange={(event) =>
                                  handleCheckboxChange(event, opcion)
                                }
                              />{" "}
                              {opcion.nombre_Componente}
                            </label>
                          );
                        }
                      }
                    });
                  })}
                </div>

                <div className="flex flex-col gap-2">
                  {filteredToppings.some((topping) =>
                    topping.some(
                      (opcion) =>
                        product.producto_id.$oid === opcion.producto_id.$oid
                    )
                  ) && <h5 className="font-semibold mt-4">Toppings</h5>}

                  {filteredToppings.map((topping) => {
                    return topping.map((opcion) => {
                      if (
                        opcion.producto_id.$oid === product.producto_id.$oid
                      ) {
                        return (
                          <div key={opcion._id.$oid} className="mt-2">
                            {opcion.nombre_topping}
                            <p>
                              <strong>
                                $
                                {Number(opcion.topping_precio).toLocaleString(
                                  "es-CO"
                                )}
                              </strong>
                            </p>
                            <div className="flex items-center space-x-2">
                              {opcion.qty > 1 ? (
                                <button
                                  className="text-sm font-semibold w-8 h-8 rounded-full items-center justify-center border border-gray-200 bg-gray-100 transition ease-in-out duration-150 hover:bg-gray-200"
                                  onClick={() => removeToppings(opcion)}
                                >
                                  -
                                </button>
                              ) : (
                                <button
                                  className="text-sm font-semibold w-8 h-8 rounded-full items-center justify-center border border-gray-200 bg-gray-100 transition ease-in-out duration-150 hover:bg-gray-200"
                                  onClick={() => removeToppings(opcion)}
                                >
                                  <DeleteIcon />
                                </button>
                              )}
                              <div className="text-sm font-semibold px-2">
                                {selectedToppings.map(
                                  (selectedTopping, index) => {
                                    return selectedTopping._id.$oid ===
                                      opcion._id.$oid ? (
                                      <span key={index}>
                                        {selectedTopping.qty}
                                      </span>
                                    ) : null;
                                  }
                                )}
                              </div>

                              <button
                                className="text-sm font-semibold w-8 h-8 rounded-full items-center justify-center border border-gray-200 bg-gray-100 transition ease-in-out duration-150 hover:bg-gray-200"
                                onClick={() => addToppings(opcion)}
                              >
                                +
                              </button>
                              <div>
                                {selectedToppings.map(
                                  (selectedTopping, index) => {
                                    return selectedTopping._id.$oid ===
                                      opcion._id.$oid ? (
                                      <span
                                        key={index}
                                        style={{ marginLeft: "200px" }}
                                      >
                                        $
                                        {selectedTopping.totalPrice.toLocaleString(
                                          "es-CO"
                                        )}
                                      </span>
                                    ) : null;
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    });
                  })}

                  {/* {filteredToppings.map((topping) => {
                    return topping.map((opcion) => {
                      if (
                        opcion.producto_id.$oid === product.producto_id.$oid
                      ) {
                        return (
                          <label key={opcion._id.$oid}>
                            <input
                              type="checkbox"
                              value={opcion._id.$oid}
                              onChange={handleCheckboxChange}
                            />
                            {opcion.nombre_topping}
                            <p>
                              <strong>${opcion.topping_precio}</strong>
                            </p>
                          </label>
                        );
                      }
                    });
                  })} */}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  addCartItem({
                    id: product._id.$oid,
                    src: product.src,
                    alt: product.nombre_opcion,
                    description: product.descripcion_opcion,
                    price: totalPrice,
                    toppings: selectedToppings,
                    complements: selectedOptions,
                  });
                  onClose();
                }}
              >
                <AddCart />
                Agregar{" "}
                <span style={{ marginLeft: "50px" }}>
                  ${totalPrice.toLocaleString("es-CO")}
                </span>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
