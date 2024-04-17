import { useProduct } from "../context/ProductsProvider";
import { STATUS } from "../utils/status";
import Loader from "../components/Loader";
import ProductList from "../components/ProductList";
import { useCategory } from "../context/CategoryProvider";
import HeaderSlider from "../components/HeaderSlider";

const Home = () => {
  const { state: categoryState } = useCategory();
  const { categories } = categoryState;
  const { state: productState } = useProduct();
  let { products, productsStatus } = productState;
  // console.log("categories", categories)

  return (
    <main className="bg-gradient-to-br from-transparent via-purple-300 to-transparent">
      <HeaderSlider />
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
