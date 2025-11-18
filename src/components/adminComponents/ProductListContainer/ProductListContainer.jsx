import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../../services/product";
import { ItemListAdmin } from "../ItemListAdmin/ItemListAdmin";
import { useAuthContext } from "../../../context/AuthContext/UseAuthContext";

export const ProductListContainer = () => {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleDelete = async (id) => {
    if (!user) {
      alert("Debes iniciar sesión como admin");
      return;
    }

    const ok = confirm("Seguro que deseas eliminar este producto?");
    if (!ok) return;

    await deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h1>Administración de productos</h1>
      <ItemListAdmin lista={products} onDelete={handleDelete} />
    </div>
  );
};
