import { useEffect } from "react";
import { useProduct } from "../context/ProductsProvider";
import { formatPrice } from "../utils/helper";
import { STATUS } from "../utils/status";
import Loader from "../components/Loader";
import ProductList from "../components/ProductList";

const Home = () => {
  const { state } = useProduct();
  let { products, productsStatus } = state;
  // console.log("state in home", state);
  console.log("products in home", products);
  console.log("status", productsStatus);

  return (
    <main className="bg-gradient-to-br from-transparent via-purple-300 to-transparent">
      <h1 className="text-center text-2xl">Products</h1>
      <div className="categories-item">
        {productsStatus === STATUS.LOADING ? (
          <Loader />
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </main>
  );
};

export default Home;
