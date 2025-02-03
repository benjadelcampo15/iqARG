import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <header className="pt-2 flex justify-center">
        <Link to="dashboard">
          <h1 className="text-4xl">Panel de Administración</h1>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
