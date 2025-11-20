// src/components/CheckoutForm/CreditCardPreview.jsx
import React from "react";

export default function CreditCardPreview({ cardNumber, cardName, expiry, cvv, flipped }) {
  return (
    <div className={`card-3d ${flipped ? "flipped" : ""}`}>
      <div className="card-front">
        <div className="number">{cardNumber || "•••• •••• •••• ••••"}</div>
        <div className="name">{cardName || "NOMBRE DEL TITULAR"}</div>
        <div className="exp">{expiry || "MM/YY"}</div>
      </div>
      <div className="card-back">
        <div className="band"></div>
        <div className="cvv-box">{cvv || "•••"}</div>
      </div>
    </div>
  );
}
