import { useEffect, useState } from "react";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import "./ItemDetailContainer.css";

export const ItemDetailContainer = () => {
  const [detail, setDetail] = useState({});

  
  const { id } = useParams();

  useEffect(() => {
    fetch("https://690a73ce1a446bb9cc2295d4.mockapi.io/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se encontró el producto");
        }

        return res.json();
      })
      .then((data) => {
        const found = data.find((p) => p.id === id); 
        if (found) {
          setDetail(found);
        } else {
          throw new Error("Producto no encontrado");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <main>
      {Object.keys(detail).length ? (
        <ItemDetail detail={detail} />
      ) : (
        <p>Cargando...</p>
      )}
    </main>
  );
};
