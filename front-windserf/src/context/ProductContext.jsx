import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = "";
      const data = response.json;
      setProducts(data);
    } catch (err) {
      setError("No se encontraron productos");
    } finally {
      setLoading(true);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const responseCategories = "";
      const responseSubCategories = "";
      const categories = responseCategories.json;
      const subCategories = responseSubCategories.json;
      setCategories(categories);
      setSubCategories(subCategories);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const postProduct = (product) => {};

  const updateProduct = (id, product) => {};

  const postCategory = (category) => {};

  const postSubCategory = (category, subCategory) => {};

  const deleteSubCategory = (subCategory) => {};

  const addView = (productId, userId) => {
    /* axios.put("..../products/" + productId + "/view", { productId, userId }); */
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        categories,
        subCategories,
        postProduct,
        updateProduct,
        postCategory,
        postSubCategory,
        deleteSubCategory,
        addView,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
