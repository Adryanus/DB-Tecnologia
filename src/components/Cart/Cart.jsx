import { useCartContext } from "../../context/CartContext/useCartContext";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, checkout } = useCartContext();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleConfirm = async (data) => {
    const { buyer } = data;

    await checkout(buyer);
    navigate("/gracias");
  };

  return (
    <CheckoutForm
      total={cart.reduce((acc, p) => acc + p.price * p.quantity, 0)}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
}



