import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/index";
import { ProductProvider } from "../src/context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  );
}

export default App;
