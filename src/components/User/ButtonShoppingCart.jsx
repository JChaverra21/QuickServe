import { useContext } from "react";
import FormShoppingCart from "./FormShoppingCart";
import { Button, useDisclosure } from "@nextui-org/react";
import { CartContext } from "../../context/CartContext";

const ButtonShoppingCart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { cartItems } = useContext(CartContext);

  return (
    <div className="flex gap-4 items-center">
      {cartItems.length > 0 && (
        <Button
          onClick={onOpen}
          radius="full"
          className="bg-gradient-to-tr from-purple-300 to-purple-600 text-black shadow-lg font-semibold w-full md:w-48"
        >
          PAGAR
        </Button>
      )}
      <FormShoppingCart isOpen={isOpen} onOpenChange={onClose} />
    </div>
  );
};

export default ButtonShoppingCart;
