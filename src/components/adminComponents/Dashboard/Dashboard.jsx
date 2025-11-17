import { useEffect, useState } from "react";
import { getProducts } from "../../../services/product";
import "./Dashboard.css";

const parsePriceToNumber = (raw) => {
  if (raw === null || raw === undefined) return NaN;
  let s = String(raw).trim();
  s = s.replace(/[^\d.,-]/g, "");
  if (s.includes(".") && s.includes(",")) {
    const lastDot = s.lastIndexOf(".");
    const lastComma = s.lastIndexOf(",");
    if (lastComma > lastDot) {
      s = s.replace(/\./g, "");
      s = s.replace(",", ".");
    } else {
      s = s.replace(/,/g, "");
    }
  } else if (s.includes(",")) {
    s = s.replace(",", ".");
  }
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : NaN;
};

// Formateador de números con separador de miles
const formatNumber = (num) => {
  return new Intl.NumberFormat("es-AR").format(num);
};

export const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const total = products.length;
  const categorias = [...new Set(products.map((p) => p.category))];

  const prices = products
    .map((p) => parsePriceToNumber(p.price))
    .filter((v) => !Number.isNaN(v));

  const avgPrice =
    prices.length > 0
      ? prices.reduce((acc, v) => acc + v, 0) / prices.length
      : 0;

  return (
    <section className="dashboard">
      <h1 className="dash-title">Panel de Administración</h1>

      <div className="dash-grid">
        <div className="dash-card">
          <h3>Total de productos</h3>
          <p className="dash-number">{formatNumber(total)}</p>
        </div>

        <div className="dash-card">
          <h3>Categorías cargadas</h3>
          <p className="dash-number">{formatNumber(categorias.length)}</p>
        </div>

        <div className="dash-card">
          <h3>Precio promedio</h3>
          <p className="dash-number">${formatNumber(avgPrice.toFixed(2))}</p>
        </div>

        <div className="dash-card dash-disabled">
          <h3>Órdenes</h3>
          <p className="dash-number">Próximamente</p>
        </div>
      </div>
    </section>
  );
};

