/* eslint-disable react/prop-types */
import { useProducts } from "../../../context/ProductContext";
import Product from "../../../components/Product/Product";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useProducts();
  const relatedProducts = products
    .filter(
      (product) =>
        product.category === category && product.subCategory === subCategory
    )
    .slice(0, 5);
  return (
    <section className="mt-12">
      <h2 className="mb-3 text-3xl font-medium self-center justify-self-center">
        Productos relacionados
      </h2>
      <div className="flex">
        {relatedProducts.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            subCategory={product.subCategory}
            price={product.price}
          />
        ))}
        {/*         <Product />
        <Product />
        <Product />
        <Product />
        <Product /> */}
      </div>
    </section>
  );
};

export default RelatedProducts;
