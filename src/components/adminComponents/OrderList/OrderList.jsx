import { useEffect, useState } from "react";
import { getOrders } from "../../../services/orders";
import "./OrderList.css";

export const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <section className="orders-page">
      <h1 className="orders-title">Órdenes de Compra</h1>

      {orders.length === 0 ? (
        <p>No hay órdenes registradas.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Cantidad de Items</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{new Date(o.date).toLocaleString()}</td>
                <td>{o.items.length}</td>
                <td>${o.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};
