import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext/CartContext";
import "./CheckoutCard.css";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  // Estado del formulario de tarjeta
  const [form, setForm] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Máscara número tarjeta
    if (name === "cardNumber") {
      let val = value.replace(/\D/g, "");
      val = val.replace(/(.{4})/g, "$1 ").trim();
      setForm({ ...form, cardNumber: val });
      return;
    }

    // Máscara MM/YY
    if (name === "expiry") {
      let val = value.replace(/\D/g, "");
      if (val.length >= 3) val = val.slice(0, 2) + "/" + val.slice(2, 4);
      val = val.slice(0, 5);
      setForm({ ...form, expiry: val });
      return;
    }

    // CVV
    if (name === "cvv") {
      const val = value.replace(/\D/g, "");
      setForm({ ...form, cvv: val });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pago enviado (demo)");
    // Aquí después llamarás a checkout() si querés
  };

  const handleCancel = () => {
    clearCart();   // Vacía contexto + localStorage
    navigate("/"); // Página de inicio
  };

  return (
    <div className="checkout-container">
      {/* Tarjeta 3D */}
      <div className="card-preview-wrapper">
        <div className={`card-3d ${isFlipped ? "flipped" : ""}`}>
          {/* Frente */}
          <div className="card-front">
            <div className="number">{form.cardNumber || "•••• •••• •••• ••••"}</div>
            <div className="name">{form.cardName || "NOMBRE DEL TITULAR"}</div>
            <div className="exp">{form.expiry || "MM/YY"}</div>
          </div>

          {/* Dorso */}
          <div className="card-back">
            <div className="band"></div>
            <div className="cvv-box">{form.cvv || "•••"}</div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>Número de tarjeta</label>
        <input
          type="text"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          maxLength={19}
          placeholder="XXXX XXXX XXXX XXXX"
        />

        <label>Nombre en la tarjeta</label>
        <input
          type="text"
          name="cardName"
          value={form.cardName}
          onChange={handleChange}
          placeholder="Juan Pérez"
        />

        <label>Vencimiento</label>
        <input
          type="text"
          name="expiry"
          value={form.expiry}
          onChange={handleChange}
          placeholder="MM/YY"
          maxLength={5}
        />

        <label>CVV</label>
        <input
          type="text"
          name="cvv"
          value={form.cvv}
          maxLength={4}
          onFocus={() => setIsFlipped(true)}
          onBlur={() => setIsFlipped(false)}
          onChange={handleChange}
        />

        {/* Botones */}
        <div className="checkout-buttons">
          <button type="submit" className="btn-confirmar">Confirmar pago</button>
          <button type="button" className="btn-cancelar" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}


