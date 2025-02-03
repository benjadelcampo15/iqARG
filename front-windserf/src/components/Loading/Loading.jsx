// eslint-disable-next-line react/prop-types
const Loading = ({ message = "Cargando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige">
      <div className="w-16 h-16 border-4 border-t-red-500 border-gray-300 rounded-full animate-spin"></div>
      <p className="mt-4 text-xl text-gray-700 font-semibold">{message}</p>
    </div>
  );
};

export default Loading;
