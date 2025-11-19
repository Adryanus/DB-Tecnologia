import { CartContext } from "./CartContext";
import { useState } from "react";
import { createOrder } from "../../services/orders";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const exists = (id) => {
    const exist = cart.some((product) => product.id === id);
    return exist;
  };

  const addItem = (item) => {
    if (exists(item.id)) {
      const updatedCart = cart.map((product) => {
        if (product.id === item.id) {
          return { ...product, quantity: product.quantity + item.quantity };
        } else {
          return product;
        }
      });
      setCart(updatedCart);
      alert(`Agregado a carrito`);
    } else {
      setCart([...cart, item]);
      alert(`${item.name} agregado al carrito`);
    }
  };

  const decreaseItem = (id) => {
    const updatedCart = cart
      .map((product) => {
        if (product.id === id) {
          if (product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 }; // restar 1
          } else {
            return null; // lo eliminamos si queda 1
          }
        }
        return product;
      })
      .filter(Boolean); // eliminar los null
    setCart(updatedCart);
  };

  const deleteItem = (id) => {
    const filtered = cart.filter((product) => product.id !== id);
    setCart(filtered);
    alert(`Producto eliminado del carrito`);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    return totalItems;
  };

  const total = () => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return Math.round(total * 100) / 100;
  };

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

      console.log("ORDEN A ENVIAR →", order);

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
    addItem,
    decreaseItem,
    deleteItem,
    clearCart,
    getTotalItems,
    total,
    checkout,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
