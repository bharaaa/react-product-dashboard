import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();

        setTimeout(() => {
          setProduct(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="container mx-auto mt-40 px-36">
      <h1 className="text-4xl text-left font-bold mb-12">{product.title}</h1>
      <div className="flex">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 mr-12"
        />
        <div className="text-left">
          <p className="text-4xl font-bold mb-5">${product.price}</p>
          <p className="mb-2">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="mb-2">
            <strong>Description:</strong> {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
