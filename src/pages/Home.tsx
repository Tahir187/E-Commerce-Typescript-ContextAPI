import { useProduct } from "../context/ProductsProvider";
import { STATUS } from "../utils/status";
import Loader from "../components/Loader";
import ProductList from "../components/ProductList";
import { useCategory } from "../context/CategoryProvider";

const Home = () => {
  const { state: categoryState, fetchProductsForCategory } = useCategory();
  const { categories, categoriesStatus } = categoryState;
  const { state: productState } = useProduct();
  let { products, productsStatus } = productState;
  // console.log("state in home", state);
  // console.log("products in home", products);
  // console.log("status", productsStatus);

  return (
    <main className="bg-gradient-to-br from-transparent via-purple-300 to-transparent">
      {/* <h1 className="text-center text-2xl">Products</h1> */}
      {categories.map((category, index) => (
        <div
          className=""
          key={index}
        >
          <div className="categories-item">
            <h3 className="text-2xl font-bold text-white">{category.title}</h3>
            <div className="categories-item">
              {productsStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={products} />
              )}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Home;
