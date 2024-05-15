import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCardList from "./ProductCardList";

function ListProducts() {
  const [products, setProducts] = useState([]);
  const user = sessionStorage.getItem("username");

  useEffect(() => {
    handleListProducts();
  }, []); // El segundo argumento [] indica que este efecto se ejecuta solo una vez al montar el componente

  const handleListProducts = async () => {
    const response = await fetch("http://localhost:5000/Productos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const productos = JSON.parse(data.productos);
    console.log(productos);

    setProducts(productos); // Almacenar los productos en el estado
  };

  const hanldeSendUpdate = async (update, Ids) => {
    const response = await fetch("http://localhost:5000/Productos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productos: update, ids: ids }),
    });
    const data = await response.json();
    console.log(data);
  };

  const renderSearch = () => {
    return (
      <div className="p-4">
        {products.map((product, index) => (
          <ProductCardList key={index} product={product} />
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          /* onClick={} */
        >
          Actualizar
        </button>
      </div>
    );
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
      <div className="w-full md:w-3/4 p-4 m-5">{renderSearch()}</div>
    </div>
  );
}

export default ListProducts;
