import "./ItemAdmin.css";

export const ItemAdmin = ({ id, name, description, price, imageURL, onDelete }) => {
  return (
    <article className="admin-product-item">
      {imageURL && (
        <img src={imageURL} alt={description} className="admin-product-image" />
      )}
      <h3 className="admin-product-name">{name}</h3>
      <p className="admin-product-description">{description}</p>
      <p className="admin-product-price">${price}</p>

      <button className="delete-btn" onClick={() => onDelete(id)}>
        Eliminar
      </button>
    </article>
  );
};


