import React from "react";
import { useCartContext } from "../../context/CartContext/useCartContext";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useCartContext();
  const navigate = useNavigate();

  const handleCancel = () => {
    localStorage.removeItem("carrito"); // Borrar storage
    setCart([]); // Borrar estado global
    navigate("/"); // Volver al inicio
  };

  const handleConfirm = () => {
    // lo que ya tengas para confirmar
  };

  return (
    <CheckoutForm
      total={cart.reduce((acc, prod) => acc + prod.precio, 0)}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
}
