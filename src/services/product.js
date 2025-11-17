export const BASE_URL = "https://690a73ce1a446bb9cc2295d4.mockapi.io/products";

export const createProduct = async (product) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

export const getProducts = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error obteniendo productos");
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return true;
};