import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { totalPrice } = useCart();
//   console.log(product);
  return (
    <div>
      <Link to={`product/${product.id}`} key={product.id}>
        <div className="bg-gray-100 relative rounded-lg shadow-md transition duration-300  ease-in-out hover:shadow-lg">
          <div className="absolute left-0 top-4 bg-gray-700 text-white text-xs capitalize px-4 py-1 rounded">
            {product?.category}
          </div>
          <div className="pb-1 mb-3 h-48 overflow-hidden rounded-t-lg">
            <img
              className="object-cover pb-1 mb-3 w-full h-full"
              src={product?.images[0]}
              alt={product.title}
            />
          </div>
          <div className="text-center px-3">
          <div className="border-b pb-2 mb-2">
            <span className="font-medium">Brand:</span>{" "}
            <span className="font-semibold">{product?.brand}</span>
          </div>
          <div className="py-2 text-sm font-semibold">{product?.title}</div>
          <div className="flex justify-center items-center gap-2 pb-2">
            <span className="opacity-70 text-xs">
            {`${totalPrice}: ${(product?.discountedPrice)}`}
            </span>
            <span className="opacity-70 line-through text-xs">
              {product.price}
            </span>
          </div>
        </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
