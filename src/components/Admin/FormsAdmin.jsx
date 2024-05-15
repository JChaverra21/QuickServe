import React, { useState } from "react";
import FormProduct from "./Productos/FormProduct";
import FormOption from "./Productos/FormOption";
import FormComponets from "./Productos/FormComponets";
import FormToppings from "./Productos/FormToppings";
import { Navigate, Link } from "react-router-dom";
import PrevProduct from "./Productos/PrevProduct";
import { Toaster } from "sonner";

const backendUrl = "http://localhost:5000";

function FormsAdmin() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const user = sessionStorage.getItem("username");

  const handleNext = (formData) => {
    setData({ ...data, ...formData });
    setStep(step + 1);
  };

  const handleBack = () => {
    const newData = { ...data };
    delete newData[`step${step}`];
    setData(newData);
    setStep(step - 1);
  };

  const handleSend = async () => {
    await fetch(`${backendUrl}/Productos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setStep(step + 1);
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return <FormProduct onNext={handleNext} />;
      case 2:
        return <FormOption onNext={handleNext} onback={handleBack} />;
      case 3:
        return <FormComponets onNext={handleNext} onback={handleBack} />;
      case 4:
        return <FormToppings onNext={handleNext} onback={handleBack} />;
      case 5:
        return (
          <PrevProduct data={data} send={handleSend} onback={handleBack} />
        );
      default:
        return <Navigate to="/admin" />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="bg-gray-800 text-white w-full md:w-1/4 p-4">
        <img src="/Logo.webp" className="h-16 mx-auto my-4" alt="UvaLula" />
        <div className="text-lg font-bold mb-10">Admin: {user}</div>

        <Link
          to="/admin"
          className="block py-2 px-4 text-white hover:bg-gray-700"
        >
          Inicio
        </Link>

        <Link
          to="/admin/CrearProducto"
          className="block py-2 px-4 text-white hover:bg-gray-700"
        >
          Crear Producto
        </Link>
        <Link
          to="/admin/ListaProductos"
          className="block py-2 px-4 text-white hover:bg-gray-700"
        >
          Listar Productos
        </Link>
      </div>
      <Toaster />
      <div className="w-full md:w-3/4 p-4 m-5">{renderForm()}</div>
    </div>
  );
}

export default FormsAdmin;
