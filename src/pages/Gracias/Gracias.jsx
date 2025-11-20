import { motion } from "framer-motion";
import "./Gracias.css";
import { useEffect, useState } from "react";

export default function Gracias() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("order");
    if (data) setOrder(JSON.parse(data));
  }, []);

  return (
    <div className="gracias-container">
      <motion.div
        className="gracias-card"
        initial={{ opacity: 0, scale: 0.6, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="gracias-title"
        >
          ¡Gracias por tu compra!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="gracias-sub"
        >
          Tu pedido está siendo procesado.
        </motion.p>

        {order && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="order-details"
          >
            <h2>Resumen</h2>

            <ul>
              {order.items?.map((item) => (
                <li key={item.id}>
                  {item.name} — {item.quantity} × ${item.price}
                </li>
              ))}
            </ul>

            <p className="order-total">
              <strong>Total pagado: </strong>${order.total}
            </p>

            <p className="order-id">
              Número de orden: <strong>#{order.id}</strong>
            </p>
          </motion.div>
        )}

        <motion.div
          className="spinner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{ delay: 0.8, duration: 1.2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

