import { CartContext } from "./CartContext";
import { useState, useEffect } from "react";
import { createOrder } from "../../services/orders";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("carrito");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  const exists = (id) => cart.some((product) => product.id === id);

  const addItem = (item) => {
    if (exists(item.id)) {
      const updatedCart = cart.map((product) =>
        product.id === item.id
          ? { ...product, quantity: product.quantity + item.quantity }
          : product
      );
      setCart(updatedCart);
      alert(`Agregado a carrito`);
    } else {
      setCart([...cart, item]);
      alert(`${item.name} agregado al carrito`);
    }
  };

  const decreaseItem = (id) => {
    const updatedCart = cart
      .map((product) =>
        product.id === id
          ? product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : null
          : product
      )
      .filter(Boolean);

    setCart(updatedCart);
  };

  const deleteItem = (id) => {
    const filtered = cart.filter((product) => product.id !== id);
    setCart(filtered);
    alert(`Producto eliminado del carrito`);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("carrito"); // ← ESTA ES LA CLAVE
  };

  const getTotalItems = () =>
    cart.reduce((acc, item) => acc + item.quantity, 0);

  const total = () =>
    Math.round(
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100
    ) / 100;

  const checkout = async (buyerData) => {
    const ok = window.confirm("¿Desea finalizar la compra?");
    if (!ok) return alert("Puede seguir comprando");

    try {
      const order = {
        buyer: buyerData,
        items: cart.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
        })),
        total: total(),
        date: new Date().toISOString(),
      };

      const newOrder = await createOrder(order);

      alert(
        `Gracias por su compra ${buyerData.name}!\n\nNúmero de orden: #${newOrder.id}`
      );

      clearCart();
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Error generando la orden");
    }
  };

  const values = {
    cart,
    setCart,
    addItem,
    decreaseItem,
    deleteItem,
    clearCart,
    getTotalItems,
    total,
    checkout,
  };

  return (
    <CartContext.Provider value={values}>{children}</CartContext.Provider>
  );
};

