import { createContext } from "react";
export const CartContext = createContext();

//En este archivo, solo creamos el contexto y lo exportamos
//El provider lo creamos en el archivo src/context/CarContext/CartProvider.jsx
//y lo usamos en el archivo src/App.js
//De esta forma, todo lo que este dentro de <CartProvider> en App.js
//podra acceder al contexto (a lo que definamos en el provider)