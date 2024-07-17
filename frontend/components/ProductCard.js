import { useRouter } from "next/router";

const ProductCard = ({ productData }) => {
  const { name, image, _id, price, countInStock } = productData || {};
  const router = useRouter();

  const handleViewProduct = () => {
    router.push(`/products/${_id}`);
  };

  return (
    <div className="w-[90%] mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-lg">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover"
        onClick={handleViewProduct}
        style={{ cursor: "pointer" }}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-700">${price}</p>
        <p className="text-gray-500">In stock: {countInStock}</p>
        <div
          className="mt-4 inline-block bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={handleViewProduct}
          style={{ cursor: "pointer" }}
        >
          View Product
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
