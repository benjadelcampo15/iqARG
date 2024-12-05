import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <section className="mt-32 flex flex-col items-center gap-4">
      <Link
        to="/admin/searchProducts"
        className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-800 text-xl"
      >
        Search products
      </Link>
      <Link
        to="/admin/createProduct"
        className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-800 text-xl"
      >
        Create product
      </Link>
      <Link
        to="/admin/categories"
        className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-800 text-xl"
      >
        Categories
      </Link>
    </section>
  );
};

export default AdminDashboard;
