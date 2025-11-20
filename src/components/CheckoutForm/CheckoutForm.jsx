import { useState } from "react";
import "./CheckoutCard.css";

export default function CheckoutForm({ total, onConfirm, onCancel }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [card, setCard] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleBuyerChange = (e) => {
    const { name, value } = e.target;
    setBuyer({ ...buyer, [name]: value });
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      let v = value.replace(/\D/g, "");
      v = v.replace(/(.{4})/g, "$1 ").trim();
      setCard({ ...card, cardNumber: v });
      return;
    }

    if (name === "expiry") {
      let v = value.replace(/\D/g, "");
      if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
      v = v.slice(0, 5);
      setCard({ ...card, expiry: v });
      return;
    }

    if (name === "cvv") {
      let v = value.replace(/\D/g, "");
      v = v.slice(0, 4);
      setCard({ ...card, cvv: v });
      return;
    }

    setCard({ ...card, [name]: value });
  };

  // VALIDACIONES
  const validate = () => {
    if (!buyer.name || !buyer.email || !buyer.phone)
      return "Complete todos los datos del comprador";

    if (!/\S+@\S+\.\S+/.test(buyer.email))
      return "Email inválido";

    if (!/^\d{6,15}$/.test(buyer.phone))
      return "Ingrese un teléfono válido";

    if (!card.cardNumber || card.cardNumber.replace(/\s/g, "").length !== 16)
      return "Número de tarjeta inválido";

    if (!card.cardName)
      return "Ingrese nombre de tarjeta";

    // Expiry MM/YY
    const regexExpiry = /^\d{2}\/\d{2}$/;
    if (!regexExpiry.test(card.expiry))
      return "Fecha de expiración inválida";

    const [MM, YY] = card.expiry.split("/").map(n => parseInt(n));

    if (MM < 1 || MM > 12)
      return "Mes inválido";

    const now = new Date();
    const currentYY = now.getFullYear() % 100;
    const currentMM = now.getMonth() + 1;

    if (YY < currentYY || (YY === currentYY && MM < currentMM))
      return "Tarjeta vencida";

    if (!/^\d{3,4}$/.test(card.cvv))
      return "CVV inválido";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    setLoading(true);

    await onConfirm({
      buyer,
      card,
      total
    });

    setLoading(false);
  };

  return (
    <div className="checkout-container">
      {/* Tarjeta 3D */}
      <div className="card-preview-wrapper">
        <div className={`card-3d ${isFlipped ? "flipped" : ""}`}>
          <div className="card-front">
            <div className="number">
              {card.cardNumber || "•••• •••• •••• ••••"}
            </div>
            <div className="name">
              {card.cardName || "NOMBRE DEL TITULAR"}
            </div>
            <div className="exp">
              {card.expiry || "MM/YY"}
            </div>
          </div>

          <div className="card-back">
            <div className="band"></div>
            <div className="cvv-box">
              {card.cvv || "•••"}
            </div>
          </div>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Datos del comprador</h2>

        <label>Nombre completo</label>
        <input
          type="text"
          name="name"
          value={buyer.name}
          onChange={handleBuyerChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={buyer.email}
          onChange={handleBuyerChange}
        />

        <label>Teléfono</label>
        <input
          type="text"
          name="phone"
          value={buyer.phone}
          onChange={handleBuyerChange}
        />

        <h2>Datos de tarjeta</h2>

        <label>Número de tarjeta</label>
        <input
          name="cardNumber"
          value={card.cardNumber}
          onChange={handleCardChange}
          maxLength={19}
        />

        <label>Nombre en la tarjeta</label>
        <input
          name="cardName"
          value={card.cardName}
          onChange={handleCardChange}
        />

        <label>Expira</label>
        <input
          name="expiry"
          value={card.expiry}
          onChange={handleCardChange}
          maxLength={5}
        />

        <label>CVV</label>
        <input
          name="cvv"
          value={card.cvv}
          onChange={handleCardChange}
          maxLength={4}
          onFocus={() => setIsFlipped(true)}
          onBlur={() => setIsFlipped(false)}
        />

        <div className="checkout-buttons">
          <button
            type="submit"
            className="btn-confirmar"
            disabled={loading}
          >
            {loading ? "Procesando..." : "Confirmar pago"}
          </button>

          <button
            type="button"
            className="btn-cancelar"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

