import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
    <tr>
      <td className="border border-gray-300 p-2">{product.id}</td>
      <td className="border border-gray-300 p-2 text-left">{product.title}</td>
      <td className="border border-gray-300 p-2">{product.category}</td>
      <td className="border border-gray-300 p-2">${product.price}</td>
      <td className="border border-gray-300 p-2">
        <Link to={`/products/${product.id}`} className="text-blue-500">
          View Details
        </Link>
      </td>
    </tr>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
