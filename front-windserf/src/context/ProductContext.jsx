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
  const [triggerFetch, setTriggerFetch] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get("http://localhost:3000/products");
      const data = response.data;
      setProducts(data);
    } catch (err) {
      setError("No se encontraron productos");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const responseCategories = await axios.get(
        "http://localhost:3000/categories"
      );

      const responseSubCategories = await axios.get(
        "http://localhost:3000/subcategories"
      );
      const categories = responseCategories.data;

      const subCategories = responseSubCategories.data;
      setCategories(categories);
      setSubCategories(subCategories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const postProduct = async (product) => {
    const result = await axios.post("http://localhost:3000/products", product);
    setTriggerFetch((prev) => !prev);
    if (result) {
      alert("Producto creado correctamente");
    }
  };

  const updateProduct = async (id, product) => {
    await axios.put(`http://localhost:3000/products/${id}`, product);
    setTriggerFetch((prev) => !prev);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
  };

  const postCategory = async (category) => {
    await axios.post("http://localhost:3000/categories", { name: category });
    setTriggerFetch((prev) => !prev);
  };

  const deleteCategory = async (category) => {
    await axios.delete(`http://localhost:3000/categories/${category}`);
    setTriggerFetch((prev) => !prev);
  };

  const postSubCategory = async (category, subCategory) => {
    await axios.post("http://localhost:3000/subcategories", {
      name: subCategory,
      category: category,
    });
    setTriggerFetch((prev) => !prev);
  };

  const deleteSubCategory = async (subCategory) => {
    await axios.delete(`http://localhost:3000/subcategories/${subCategory}`);
    setTriggerFetch((prev) => !prev);
  };

  const addView = useCallback(async (productId, userId) => {
    await axios.post(`http://localhost:3000/products/${productId}/view`, {
      userId,
    });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, triggerFetch]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, triggerFetch]);

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
        deleteProduct,
        postCategory,
        deleteCategory,
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
