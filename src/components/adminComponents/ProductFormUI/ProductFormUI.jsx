import React from "react";
import "./ProductFormUI.css";


export const ProductFormUI = ({
  product,
  errors,
  loading,
  onChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>Agregar producto</h2>

        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
            min={0}
            required
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={onChange}
            required
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={onChange}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
          {errors.file && <p className="error">{errors.file}</p>}

          {/* 🖼️ Vista previa */}
          {product.preview && (
            <div className="image-preview">
              <img
                src={product.preview}
                alt="Vista previa"
                className="preview-img"
              />
            </div>
          )}
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Producto"}
        </button>
      </form>
    </section>
  );
};
