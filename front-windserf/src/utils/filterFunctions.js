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
    const productCategory = product.category.name.replace(" ", "-");

    if (subCategory) {
      return (
        productCategory === category && product.subCategory.name === subCategory
      );
    } else {
      return productCategory === category;
    }
  });
};

export const filterByQuerys = (products, queryParams) => {
  return products.filter((product) => {
    return Object.keys(queryParams).every((key) => {
      if (!queryParams[key].length) return true;

      const productValue = Array.isArray(product[key])
        ? product[key].map((v) => v.toLowerCase())
        : product[key]?.toLowerCase();
      const filterValues = queryParams[key].map((v) => v.toLowerCase());

      if (Array.isArray(productValue)) {
        return filterValues.some((value) => productValue.includes(value));
      }
      return filterValues.includes(productValue);
    });
  });
};

export const updateSearchParams = (filterKey, filterValue) => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentValues = urlParams.get(filterKey)?.split(",") || [];

  if (currentValues.includes(filterValue)) {
    const updatedValues = currentValues.filter(
      (value) => value !== filterValue
    );
    updatedValues.length
      ? urlParams.set(filterKey, updatedValues.join(","))
      : urlParams.delete(filterKey);
  } else {
    currentValues.push(filterValue);
    urlParams.set(filterKey, currentValues.join(","));
  }

  window.history.replaceState(null, "", "?" + urlParams.toString());
};
