import { ItemAdmin } from "../ItemAdmin/ItemAdmin";
import "./ItemListAdmin.css";

export const ItemListAdmin = ({ lista, onDelete }) => {
  return (
    <section className="admin-item-list">
      {lista.length ? (
        lista.map((prod) => (
          <ItemAdmin
            key={prod.id}
            id={prod.id}
            name={prod.name}
            description={prod.description}
            price={prod.price}
            imageURL={prod.imageURL}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No hay productos cargados.</p>
      )}
    </section>
  );
};
