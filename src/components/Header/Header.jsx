import { Nav } from "../Nav/Nav";
import "./Header.css";
import logo from "/public/images/LogoDB.jpg";
export const Header = () => {
  return (
    <header>
      <a href="/" className="logo-link">
    <img
          src={logo}
          alt="Logo de DB Electrónica"
          className="logo"
        />
    </a>
      <Nav />
    </header>
  );
};
