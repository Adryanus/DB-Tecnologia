import { useContext } from "react";
import { CartContext } from "./CartContext";


export const useCartContext = () => {return useContext(CartContext)
  
}
//Este es un custom hook que nos permite usar el contexto de carrito
//de una forma mas sencilla en los componentes que lo necesiten
//En lugar de importar useContext y CartContext en cada componente,
//solo importamos este custom hook y lo usamos directamente
//Ejemplo: const {addItem, clearCart} = useCartContext();