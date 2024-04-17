import { shopping_cart } from "../utils/images";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helper";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import Popup from "reactjs-popup";
import CheckOut from "../components/Checkout";
import { useCart } from "../context/CartProvider";

const CartPage = () => {
  const { state: cartState, dispatch } = useCart();
  const {
    carts,
    itemsCount,
    totalAmount,
    removeFromCart,
    toggleCartQty,
    clearCart,
  } = cartState;
  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" }); 
  };

  if (carts.length === 0) {
    return (
      <div className="container my-5">
        <div className="empty-cart flex justify-center items-center flex-col font-manrope">
          <img src={shopping_cart} alt="" className="w-32 mb-4" />
          <span className="font-semibold text-gray-600 text-lg">
            Your shopping cart is empty.
          </span>
          <Link
            to="/"
            className="shopping-btn bg-orange text-black font-semibold px-6 py-2 mt-4 transition duration-300 ease-in-out hover:bg-transparent hover:text-orange border border-orange-500 rounded-md"
          >
            Go shopping Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container flex flex-col px-4 mx-auto">
        <div className="cart-ctable w-full">
          <div className="cart-chead bg-white shadow-sm rounded-t-md mb-4 p-2">
            <div className="flex font-semibold text-sm">
              <div className="w-1/6 py-3">S.N.</div>
              <div className="w-2/6 py-3">Product</div>
              <div className="w-1/6 py-3">Unit Price</div>
              <div className="w-1/6 py-3">Quantity</div>
              <div className="w-1/6 py-3">Total Price</div>
              <div className="w-1/6 py-3">Actions</div>
            </div>
          </div>

          <div className="cart__body">
            {carts.map((cart, idx) => (
              <div key={cart.id}>
                <div className="w-full md:w-1/6 py-3">{idx + 1}</div>
                <div className="w-full md:w-2/6 py-3">{cart?.title}</div>
                <div className="w-full md:w-1/6 py-3">
                  {formatPrice(cart?.price)}
                </div>
                <div className="tog__qu w-full md:w-1/6 py-3 flex items-center">
                  <button
                    type="button"
                    className="qty-change mr-1 border border-gray-300 rounded-md w-8 h-8 flex items-center justify-center focus:outline-none"
                    onClick={() =>
                      dispatch(toggleCartQty({ id: cart?.id, type: "DEC" }))
                    }
                  >
                    <AiOutlineMinusCircle className="text-2xl" />
                  </button>
                  {/* ... */}
                  <button
                    type="button"
                    className="qty-change ml-1 border border-gray-300 rounded-md w-8 h-8 flex items-center justify-center focus:outline-none"
                    onClick={() =>
                      dispatch(toggleCartQty({ id: cart?.id, type: "INC" }))
                    }
                  >
                    <AiOutlinePlusCircle className="text-2xl " />
                  </button>
                </div>
                <div className="w-full md:w-1/6 py-3 text-orange font-semibold">
                  {formatPrice(cart?.totalPrice)}
                </div>

                <div>
                  <button
                    type="button"
                    className="delete-btn text-sm text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => dispatch(removeFromCart(cart?.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-cfoot flex flex-col md:flex-row justify-between py-3 bg-white shadow-sm rounded-b-md">
            <div className="px-2">
              <button
                type="button"
                className="clear-cart-btn text-red-500 hover:text-red-700 font-semibold text-xl gap-2 flex items-center focus:outline-none"
                onClick={() => handleClearCart}
              >
                <BsTrash />
                <span>Clear Cart</span>
              </button>
            </div>
            <div className="flex flex-col items-end px-2">
              <div className="flex items-center">
                <span className="font-semibold">
                  Total ({itemsCount}) items:{" "}
                </span>
                <span className="text-orange font-semibold text-lg ml-2">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              <Popup
                trigger={
                  <button className="checkout-btn text-gray-700 bg-red-500 font-semibold px-6 py-2 mt-4 transition duration-300 ease-in-out hover:bg-transparent hover:text-red-500 border border-gray-600 rounded-md focus:outline-none">
                    {" "}
                    Check out
                  </button>
                }
                position="top center"
                modal
                nested
              >
                <CheckOut />
              </Popup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
