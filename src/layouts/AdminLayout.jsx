import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../components/adminComponents/AdminNavBar/AdminNavBar";

export const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="admin-content">
        <Outlet />
      </div>
    </>
  );
};