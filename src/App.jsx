import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext/CartProvider";

import { MainLayout } from "./layouts/MainLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { RutaProtegida } from "./components/RutaProtegida/RutaProtegida";

import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import SobreNosotros from "./components/SobreNosotros/SobreNosotros";
import Contact from "./components/Contact/Contact";
import Cart from "./components/Cart/Cart";
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer/ProductFormContainer";
import { ProductListContainer } from "./components/adminComponents/ProductListContainer/ProductListContainer";
import { Login } from "./components/Login/Login";
import { AuthProvider } from "./context/AuthContext/AuthProvider";
// ⭐ Nuevo import Dashboard
import { Dashboard } from "./components/adminComponents/Dashboard/Dashboard";
import { OrdersList } from "./components/adminComponents/OrderList/OrderList";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* LAYOUT PUBLICO */}
            <Route element={<MainLayout />}>
              <Route
                path="/"
                element={
                  <ItemListContainer titulo="Bienvenidos a DB Tecnología" />
                }
              />
              <Route path="/detail/:id" element={<ItemDetailContainer />} />
              <Route
                path="/category/:category"
                element={<ItemListContainer titulo="Productos por categoría" />}
              />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/carrito" element={<Cart />} />
            </Route>

            {/* LAYOUT ADMIN */}
            <Route path="/admin" element={<AdminLayout />}>
              {/* Página inicial del admin = login */}
              <Route index element={<Login />} />
              
              <Route
                path="ordenes"
                element={
                  <RutaProtegida>
                    <OrdersList />
                  </RutaProtegida>
                }
              />

              {/* ⭐ Nueva ruta Dashboard */}
              <Route
                path="dashboard"
                element={
                  <RutaProtegida>
                    <Dashboard />
                  </RutaProtegida>
                }
              />

              <Route
                path="alta-productos"
                element={
                  <RutaProtegida>
                    <ProductFormContainer />
                  </RutaProtegida>
                }
              />

              <Route
                path="lista-productos"
                element={
                  <RutaProtegida>
                    <ProductListContainer />
                  </RutaProtegida>
                }
              />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
