/* eslint-disable react/prop-types */
import { useProducts } from "../../../context/ProductContext";
import Product from "../../../components/Product/Product";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useProducts();

  const relatedProducts = products.filter(
    (product) =>
      product.category.name === category.name &&
      product.subCategory.name === subCategory.name
  );

  return (
    <section className="w-full mt-12">
      <h2 className="mb-3 text-3xl font-medium self-center justify-self-center">
        Productos relacionados
      </h2>
      <div className="flex overflow-x-auto">
        {relatedProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
