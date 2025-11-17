import React, { useState } from "react";
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    comentario: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("Gracias por tu consulta. Te responderemos a la brevedad.");
    setFormData({ nombre: "", email: "", telefono: "", comentario: "" });
  };

  return (
    <section className="form-container">
      <h2 className="form-title">Contáctanos</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="comentario">Comentario o consulta</label>
          <textarea
            id="comentario"
            name="comentario"
            rows="5"
            value={formData.comentario}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="form-button">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default Form;
