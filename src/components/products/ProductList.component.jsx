import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import ProductItem from "./ProductItem.component";

const ProductList = () => {
  const { state, setProducts } = useContext(GlobalContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let url = `https://fakestoreapi.com/products`;

      if (selectedCategory) {
        url += `/category/${selectedCategory}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, [selectedCategory, setProducts]);

  const sortedProducts = [...state.products].sort((a, b) => {
    return sort === "asc" ? a.id - b.id : b.id - a.id;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="mr-2">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">Sort by:</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="asc">ID: Ascending</option>
          <option value="desc">ID: Descending</option>
        </select>
      </div>

      {/* Products Table */}
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 w-10">ID</th>
            <th className="border border-gray-300 p-2 w-96">Title</th>
            <th className="border border-gray-300 p-2 w-56">Category</th>
            <th className="border border-gray-300 p-2 w-52">Price</th>
            <th className="border border-gray-300 p-2 w-36">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`p-2 border ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
