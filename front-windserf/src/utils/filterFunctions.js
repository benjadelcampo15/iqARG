export const sortProducts = (products, option) => {
  switch (option) {
    case "Precio: Bajo a Alto":
      return [...products].sort((a, b) => a.price - b.price);
    case "Precio: Alto a Bajo":
      return [...products].sort((a, b) => b.price - a.price);
    case "Popularidad":
      return [...products].sort((a, b) => b.popularity - a.popularity);
    // Reemplaza `popularity` con la propiedad real de popularidad de tu objeto de producto
    case "Novedades":
      return [...products].sort(
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    // Reemplaza `releaseDate` con la propiedad real de la fecha de lanzamiento de tu objeto de producto
    default:
      return products; // Retorna los productos sin cambios si no hay una opción válida
  }
};

export const filterByCategory = (products, category, subCategory) => {
  return products.filter((product) => {
    if (subCategory) {
      return (
        product.category === category && product.subCategory === subCategory
      );
    } else {
      return product.category === category;
    }
  });
};

export const filterByQuerys = (filteredProducts, dynamicSearchParams) => {
  return filteredProducts.filter((product) => {
    return Object.entries(dynamicSearchParams).every(([key, value]) => {
      return !value || product[key] === value || product[key].includes(value);
    });
  });
};
