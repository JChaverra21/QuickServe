import React, { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { CartContext } from "../../context/CartContext";

const FormShoppingCart = ({ isOpen, onOpenChange }) => {
  const paymentOptions = [
    { label: "Efectivo", value: "efectivo" },
    { label: "Transferencia", value: "transferencia" },
  ];

  const { cartItems, setCartItems } = useContext(CartContext);

  // Define el estado inicial
  const initialState = {
    nombre: "",
    celular: "",
    direccion: "",
    metodoPago: "",
  };

  // Usa el estado inicial para inicializar formData
  const [formData, setFormData] = useState(initialState);

  // En tu función de envío del formulario, reinicia formData al estado inicial
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    // Validación del nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "Por favor ingresa tu nombre completo";
    }
    // Validación del número de celular
    const celularPattern = /^[0-9]{10}$/;
    if (!celularPattern.test(formData.celular)) {
      newErrors.celular =
        "Por favor ingresa un número de celular válido Ej: 3202459878";
    }
    // Validación de la dirección
    if (!formData.direccion.trim()) {
      newErrors.direccion = "Por favor ingresa tu dirección";
    }
    // Validación del método de pago
    if (!formData.metodoPago) {
      newErrors.metodoPago = "Por favor selecciona un método de pago";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Almacenar en JSON los datos del formulario y el carrito, excluir la imagen

      const total = cartItems.reduce((acc, item) => acc + item.total, 0);
      const cartItemsWithoutImage = cartItems.map(({ src, ...item }) => item);
      const data = JSON.stringify({
        datos: formData,
        carrito: cartItemsWithoutImage,
        total: total,
      });
      console.log(data);

      // Enviar los datos a la URL proporcionada
      fetch("https://0763-181-237-196-79.ngrok-free.app/Pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // Reinicia cartItems al estado inicial
      setCartItems([]);

      // Aquí puedes enviar los datos del formulario
      //console.log("Formulario enviado correctamente:", formData);
      // Puedes cerrar el modal o realizar alguna otra acción
      onOpenChange();

      // Reinicia formData al estado inicial
      setFormData(initialState);
    }
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpiar el error del campo al cambiar su valor
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleModalClose = () => {
    // Reiniciar los estados al cerrar el modal
    setFormData({
      nombre: "",
      celular: "",
      direccion: "",
      metodoPago: "",
    });
    setErrors({});
    onOpenChange();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleModalClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Ingresa tus datos
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Input
                isRequired
                autoFocus
                label="Nombre Completo"
                placeholder="Ingresa tu nombre completo"
                variant="bordered"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                error={errors.nombre}
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm">{errors.nombre}</p>
              )}
              <Input
                isRequired
                label="Número de celular"
                placeholder="Ingresa tu número de celular"
                type="tel"
                variant="bordered"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                error={errors.celular}
                className="mt-4"
              />
              {errors.celular && (
                <p className="text-red-500 text-sm">{errors.celular}</p>
              )}
              <Input
                isRequired
                label="Dirección"
                placeholder="Ingresa tu dirección"
                type="text"
                variant="bordered"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                error={errors.direccion}
                className="mt-4"
              />
              {errors.direccion && (
                <p className="text-red-500 text-sm">{errors.direccion}</p>
              )}
              <Autocomplete
                isRequired
                label="Método de pago"
                placeholder="Selecciona un método de pago"
                variant="bordered"
                defaultItems={paymentOptions}
                name="metodoPago"
                value={formData.metodoPago}
                onSelect={(value) =>
                  setFormData({ ...formData, metodoPago: value.target.value })
                }
                error={errors.metodoPago}
                className="mt-4"
              >
                {(item) => (
                  <AutocompleteItem key={item.value} value={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              {errors.metodoPago && (
                <p className="text-red-500 text-sm">{errors.metodoPago}</p>
              )}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={handleModalClose}>
              Cerrar
            </Button>
            <Button color="primary" type="submit" onClick={handleSubmit}>
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormShoppingCart;
