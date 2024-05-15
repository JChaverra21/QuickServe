import { Link } from "react-router-dom";

function Admin() {
  const user = sessionStorage.getItem("username");

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="bg-gray-800 text-white w-full md:w-1/4 p-4">
        <img src="/Logo.webp" className="h-16 mx-auto my-4" alt="UvaLula" />
        <div className="text-lg font-bold mb-10">Admin: {user}</div>

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

      <div className="w-full md:w-3/4 p-4"> </div>
    </div>
  );
}

export default Admin;
