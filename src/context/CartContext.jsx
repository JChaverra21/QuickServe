/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Primero, intenta cargar los productos desde el localStorage
        const localStorageProducts = localStorage.getItem("products");
        const expiry = localStorage.getItem("expiry");

        // Comprueba si los productos están en el localStorage y si no han expirado
        if (localStorageProducts && expiry && new Date().getTime() < expiry) {
          setProducts(JSON.parse(localStorageProducts));
          return;
        }

        // Si no hay productos en el localStorage o han expirado, haz la petición a la base de datos
        const response = await fetch("https://0763-181-237-196-79.ngrok-free.app/Productos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const productos = JSON.parse(data.productos);
        console.log(productos);

        // Almacena los productos en el localStorage para futuras cargas
        localStorage.setItem("products", JSON.stringify(productos));

        // Almacena la fecha de expiración en el localStorage (por ejemplo, 1 hora a partir de ahora)
        const expiryDate = new Date().getTime() + 60 * 60 * 1000; // 1 hora en milisegundos
        localStorage.setItem("expiry", expiryDate);

        setProducts(productos);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  /* products.forEach((product) => {
    console.log(product.nombre_producto);
  }); */

  // Modal
  const [selectedGlasses, setSelectedGlasses] = useState(null);

  const [cartItems, setCartItems] = useState([]);

  // FUNCIONAL
  /* const addCartItem = (item) => {
    const exist = cartItems.find((cartItem) => cartItem.id === item.id);
    if (exist) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...exist,
                qty: exist.qty + 1,
                total: item.price * (exist.qty + 1),
              }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1, total: item.price }]);
    }
  }; */

  const addCartItem = (item) => {
    const exist = cartItems.find(
      (cartItem) =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.complements) ===
          JSON.stringify(item.complements) &&
        JSON.stringify(cartItem.toppings) === JSON.stringify(item.toppings)
    );
    if (exist) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.complements) ===
            JSON.stringify(item.complements) &&
          JSON.stringify(cartItem.toppings) === JSON.stringify(item.toppings)
            ? {
                ...exist,
                qty: exist.qty + 1,
                total: item.price * (exist.qty + 1),
              }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1, total: item.price }]);
    }
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  // FUNCIONAL
  /* const removeCartItem = (item) => {
    const exist = cartItems.find((cartItem) => cartItem.id === item.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...exist,
                qty: exist.qty - 1,
                total: item.price * (exist.qty - 1),
              }
            : cartItem
        )
      );
    }
  }; */

  const removeCartItem = (item) => {
    const exist = cartItems.find(
      (cartItem) =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.complements) ===
          JSON.stringify(item.complements) &&
        JSON.stringify(cartItem.toppings) === JSON.stringify(item.toppings)
    );
    if (exist.qty === 1) {
      setCartItems(
        cartItems.filter(
          (cartItem) =>
            cartItem.id !== item.id ||
            JSON.stringify(cartItem.complements) !==
              JSON.stringify(item.complements) ||
            JSON.stringify(cartItem.toppings) !== JSON.stringify(item.toppings)
        )
      );
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.complements) ===
            JSON.stringify(item.complements) &&
          JSON.stringify(cartItem.toppings) === JSON.stringify(item.toppings)
            ? {
                ...exist,
                qty: exist.qty - 1,
                total: item.price * (exist.qty - 1),
              }
            : cartItem
        )
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addCartItem,
        removeCartItem,
        selectedGlasses,
        setSelectedGlasses,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
