import {
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";

import ItemCart from "./ItemCart";

const ShoppingCart = () => {

  return (
    <Card style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <h4 className="text-md font-bold text-xl">Tu Carrito</h4>
        </div>
      </CardHeader>
      <Divider />
      <CardBody style={{ overflowY: "auto", maxHeight: "70vh" }}>
        <div className="text-center">
          <ItemCart />
        </div>
      </CardBody>
      <Divider />
    </Card>
  );
};

export default ShoppingCart;
