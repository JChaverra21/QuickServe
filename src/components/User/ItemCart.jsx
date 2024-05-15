import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Divider } from "@nextui-org/react";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import ButtonShoppingCart from "./ButtonShoppingCart";

const ItemCart = () => {
  const { cartItems, addCartItem, removeCartItem } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <div>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index} className="flex flex-col py-5">
            <div className="flex items-start">
              <div className="rounded w-[70px] h-[70px] relative overflow-clip">
                <img
                  alt={item.alt}
                  src={`data:image/png;base64,${item.src}`}
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    boxSizing: "border-box",
                    padding: 0,
                    border: "none",
                    margin: "auto",
                    display: "block",
                    width: 0,
                    height: 0,
                    minWidth: "100%",
                    maxWidth: "100%",
                    minHeight: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="flex-1 flex flex-col px-3">
                <div className="flex space-x-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {item.alt}
                  </span>
                </div>
                <div className="mt-3">
                  {Object.values(item.complements).length > 0 && (
                    <>
                      <strong className="text-xs">Complementos:</strong>
                      {Object.values(item.complements).map(
                        (complement, index, array) => {
                          return (
                            <span key={index} className="text-xs text-gray-600">
                              {complement.nombre_Componente}
                              {index < array.length - 1 ? ", " : ""}
                            </span>
                          );
                        }
                      )}
                    </>
                  )}
                </div>
                <div>
                  {item.toppings.length > 0 && (
                    <>
                      <strong className="text-xs">Toppings:</strong>
                      {item.toppings.map((topping, index) => {
                        return (
                          <span key={index} className="text-xs text-gray-600">
                            {topping.nombre_topping} {`(${topping.qty})`}
                            {index < item.toppings.length - 1 ? ", " : ""}
                          </span>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col text-sm items-end">
                ${item.total.toLocaleString("es-CO")}
              </div>
            </div>
            <div className="flex pl-16 ml-1 mt-2">
              <div className="flex flex-1 justify-start items-center">
                {item.qty > 1 ? (
                  <button
                    className="text-sm font-semibold w-8 h-8 rounded-full items-center justify-center border border-gray-200 bg-gray-100 transition ease-in-out duration-150 hover:bg-gray-200"
                    onClick={() => removeCartItem(item)}
                  >
                    -
                  </button>
                ) : (
                  <button
                    className="text-sm font-semibold w-8 h-8 rounded-full items-center justify-center border border-gray-200 bg-gray-100 transition ease-in-out duration-150 hover:bg-gray-200"
                    onClick={() => removeCartItem(item)}
                  >
                    <DeleteIcon />
                  </button>
                )}
                <div className="text-sm font-semibold px-2">{item.qty}</div>
                <button
                  className="text-sm font-semibold w-8 h-8 rounded-full items-center justify-center border border-gray-200 bg-gray-100 transition ease-in-out duration-150 hover:bg-gray-200"
                  onClick={() => addCartItem(item)}
                >
                  +
                </button>
              </div>
              {/* <div className="inline-flex text-sm border-2 items-center transition ease-in-out duration-150 !text-xs h-8 bg-gray-100 text-gray-700 border-gray-100 cursor-pointer hover:bg-gray-200 hover:border-gray-200 rounded-full px-4 py-0 ">
                <div className="flex-1 font-semibold">Editar</div>
              </div> */}
            </div>
            <Divider className="mt-4" />
          </div>
        ))
      ) : (
        <div>
          <h4 className="font-bold text-large">¡Arma tu carrito ahora!</h4>
          <p>Los productos que agregues aparecerán aquí</p>
        </div>
      )}
      {total > 0 && (
        <div className="mt-4">
          <strong>Total a pagar: </strong>${total.toLocaleString("es-CO")}
        </div>
      )}
      <div className="mt-8 flex justify-center">
        <ButtonShoppingCart />
      </div>
    </div>
  );
};

export default ItemCart;
