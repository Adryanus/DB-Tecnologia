import "./Cart.css";
import { CartContext } from "../../context/CartContext/CartContext";
import { useContext, useState } from "react";
import { CheckoutForm } from "../CheckoutForm/CheckoutForm";

export const Cart = () => {
    const { cart, decreaseItem, addItem, deleteItem, clearCart, total, checkout } = useContext(CartContext);

    const [showCheckout, setShowCheckout] = useState(false);

    const handleShowCheckout = () => {
        setShowCheckout(true);
    };

    return (
        <section className="itemListContainer">
            <h2>Carrito de Compras</h2>

            {cart.length === 0 ? (
                <h3>El carrito está vacío</h3>
            ) : (
                <>
                    {/* Si está completando checkout, muestro el formulario */}
                    {showCheckout ? (
                        <CheckoutForm
                            total={total()}
                            onCancel={() => setShowCheckout(false)}
                            onConfirm={async (buyerData) => {
                                await checkout(buyerData);   // ENVÍA LA ORDEN
                                setShowCheckout(false);       // OCULTA EL FORM
                                clearCart();                  // OPCIONAL: vaciar
                            }}
                        />
                    ) : (
                        <>
                            <div className="total-pagar">
                                <h3>
                                    Total a pagar:{' '}
                                    <span>
                                        {`$${total().toLocaleString('es-AR', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}`}
                                    </span>
                                </h3>

                                <div>
                                    <button className="btn" onClick={handleShowCheckout}>
                                        Finalizar Compra
                                    </button>
                                    <button className="btn" onClick={clearCart}>
                                        Vaciar Carrito
                                    </button>
                                </div>
                            </div>

                            <div className="cart-items">
                                {cart.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <img src={item.image || item.imageURL || ""} alt={item.name} />

                                        <p>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p>Cantidad: {item.quantity}</p>

                                        <div className="quantity-control">
                                            <button onClick={() => decreaseItem(item.id)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => addItem(item)}>+</button>
                                        </div>

                                        <button onClick={() => deleteItem(item.id)}>Eliminar</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </section>
    );
};

