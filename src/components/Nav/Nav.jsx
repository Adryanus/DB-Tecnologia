import { Link } from "react-router-dom";
import "./Nav.css";
import { useCartContext } from "../../context/CartContext/useCartContext";
export const Nav = () => {
  const {getTotalItems} = useCartContext();
  
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/category/Tecnología"}>Tecnología</Link>
        </li>
        <li>
          <Link to={"/category/Hogar"}>Hogar</Link>
        </li>
        <li>
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
        </li>
        <li>
          <Link to={"/carrito"}>/Carrito</Link>
          {getTotalItems() > 0 && 
          (<span className="in-cart">{getTotalItems()}</span>)
          }
        </li>
      </ul>
    </nav>
  );
};
