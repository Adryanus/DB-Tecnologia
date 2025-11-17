import { Link } from "react-router-dom";
import { UseAuthContext } from "../../../context/AuthContext/UseAuthContext";
import "./AdminNavbar.css";

export const AdminNavbar = () => {
  const { logout } = UseAuthContext();

  return (
    <nav className="admin-nav">
      <h2 className="admin-logo">ADMIN</h2>

      <ul className="admin-nav-list">
        <li><Link to="/admin/Dashboard">Dashboard</Link></li>
        <li><Link to="/admin/alta-productos">Alta productos</Link></li>
        <li><Link to="/admin/lista-productos">Lista productos</Link></li>
      </ul>

      <button className="logout-btn" onClick={logout}>
        Cerrar sesión
      </button>
    </nav>
  );
};