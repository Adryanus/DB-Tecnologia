export const ORDERS_URL = "https://690a73ce1a446bb9cc2295d4.mockapi.io/orders";

export const createOrder = async (order) => {
  try {
    const res = await fetch(ORDERS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    console.log("STATUS:", res.status);
    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    if (!res.ok) {
      throw new Error("Error al crear orden");
    }

    return JSON.parse(text);

  } catch (err) {
    console.error("ERROR createOrder:", err);
    throw err;
  }
};


export const getOrders = async () => {
  const res = await fetch(ORDERS_URL);
  if (!res.ok) throw new Error("Error obteniendo órdenes");
  return res.json();
};

