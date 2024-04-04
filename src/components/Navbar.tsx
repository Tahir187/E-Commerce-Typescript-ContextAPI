import { Link } from "react-router-dom";
import {
  FaBars,
  FaShoppingBag,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";

const Navbar = () => {
  // const {totalItems} = useCart();
  return (
    <nav className="navbar flex justify-around items-center mx-auto gap-2 pt-3 pb-3 text-white bg-gradient-to-br from-indigo-500 to to-purple-800 md:text-sm sticky top-0 z-10 shadow-lg">
      {/* brand name with hamburger menu */}
      <div className="flex gap-2 px-2">
        <button type="button" className="sidebar-show-btn text-white">
          <FaBars className="text-2xl lg:hidden" />
        </button>
          <span className="navbar-brand-ico">
            <FaShoppingBag className="text-2xl hidden lg:flex" />
          </span>
          <span className="navbar-brand-txt">
            <span className="font-semibold">Shop.</span>Com
          </span>
      </div>
      <div className="flex">
        <ul className="hidden lg:flex items-center justify-between">
          <li className="ml-4">
            Home
          </li>
          <li className="ml-4">
            About
          </li>
          <li className="ml-4">
            Shop
          </li>
        </ul>
      </div>
      {/* search bar with cart*/}
      <div className="flex items-center justify-around gap-3">
        <div className="hover:text-orange-300">
          <Link to='/cart' className="relative">
            <FaShoppingCart className="text-2xl text-whinhover:text-orange-300" />
            <div className="cart-items-value absolute text-xl top-[-20px] right-[-8px] flex text-center justify-center">
              <p className="text-white">0</p>
            </div>
            {/* <CartModal carts={carts} className="hidden" /> */}
            </Link>
        </div>
        <div className="flex items-center px-2">
          <input
            type="text"
            className="text-gray-600 w-full
                 lg:w-80 h-10 rounded-md p-2 focus:outline-none"
            placeholder="Search your preferred items here"
          />
            <FaSearch className="mr-2 ml-2 md:text-gray-600 md:-ml-9" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
