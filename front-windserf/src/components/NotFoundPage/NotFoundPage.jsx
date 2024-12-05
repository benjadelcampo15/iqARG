import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="mt-32 flex flex-col items-center gap-6">
      <h1 className="text-6xl font-bold text-slate-700">404</h1>
      <p className="text-2xl text-gray-600">
        Oops! La página que buscas no existe.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-800 text-xl"
      >
        Volver al inicio
      </Link>
    </section>
  );
};

export default NotFoundPage;
