import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/product";
import { ItemList } from "../ItemList/ItemList";
import "./ItemListContainer.css";

export const ItemListContainer = ({ titulo }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const filtered = category
          ? data.filter((p) => p.category === category)
          : data;
        setProducts(filtered);
      })
      .catch(() => setError("No se pudieron cargar los productos"))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <main>
      <section className="item-list-container">
        <h1>{titulo}</h1>
        {category && <h2>Categoría: {category}</h2>}
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <ItemList lista={products} />}
      </section>
    </main>
  );
};
