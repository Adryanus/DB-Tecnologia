import { useState } from "react";
import { useCartContext } from "../../context/CartContext/useCartContext";

export const CheckoutForm = () => {
  const { checkout } = useCartContext();

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!buyer.name || !buyer.email || !buyer.phone) {
      return alert("Por favor complete todos los campos");
    }

    checkout(buyer); // 👉 ahora checkout recibe los datos del comprador
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "20px auto" }}>
      <h2>Finalizar compra</h2>

      <input
        type="text"
        name="name"
        placeholder="Nombre completo"
        value={buyer.name}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={buyer.email}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />

      <input
        type="text"
        name="phone"
        placeholder="Teléfono"
        value={buyer.phone}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />

      <button type="submit" style={{ padding: 10, width: "100%" }}>
        Confirmar compra
      </button>
    </form>
  );
};

