import { useEffect, useState } from "react";
import ProductItem from "./products/ProductItem.component";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [cheapestProduct, setCheapestProduct] = useState(null);
  const [mostExpensiveProduct, setMostExpensiveProduct] = useState(null);
  const [categoryCount, setCategoryCount] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products"
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product) => product.price);
      setTotalProducts(products.length);
      console.log(products.length);

      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);

      const cheapest = products.find((product) => product.price === min);
      const mostExpensive = products.find(
        (product) => product.price === max
      );
      setCheapestProduct(cheapest);
      setMostExpensiveProduct(mostExpensive);

      const categoryMap = {};
      products.forEach((product) => {
        const category = product.category;
        if (categoryMap[category]) {
          categoryMap[category]++;
        } else {
          categoryMap[category] = 1;
        }
      });
      setCategoryCount(categoryMap);
    }
  }, [products]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl">{totalProducts}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Price Range</h2>
          <p className="text-xl">
            Min: ${minPrice !== null ? minPrice : 0} - Max: $
            {maxPrice !== null ? maxPrice : 0}
          </p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Cheapest Product</h2>
          {cheapestProduct ? (
            <ProductItem product={cheapestProduct} />
          ) : (
            <p>No products available</p>
          )}
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Most Expensive Product</h2>
          {mostExpensiveProduct ? (
            <ProductItem product={mostExpensiveProduct} />
          ) : (
            <p>No products available</p>
          )}
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Items per Category</h2>
          <ul className="list-disc pl-5">
            {Object.entries(categoryCount).map(([category, count]) => (
              <li key={category} className="py-1">
                {category}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
