import { useEffect, useState } from "react";
import { CategoryProductInterface, useCategory } from "../context/CategoryProvider";
import ProductList from "../components/ProductList";
import Loader from "../components/Loader";
import { STATUS } from "../utils/status";

type CategoryID = {
  category: string;
};

const CategoryProduct = ({ category }: CategoryID) => {
    const { state: categoryState, fetchProductsForCategory } = useCategory();
    const [products, setProducts] = useState<CategoryProductInterface[]>([]); 
    const [productsStatus, setProductsStatus] = useState("IDLE"); 
  
    useEffect(() => {
      const fetchCategoryProducts = async () => {
        setProductsStatus(STATUS.LOADING);
        try {
          await fetchProductsForCategory(category);
          setProducts(categoryState.categoryProducts); 
          setProductsStatus(STATUS.SUCCEEDED);
        } catch (error) {
          console.log("Error fetching products", error);
          setProductsStatus(STATUS.FAILED);
        }
      };
  
      if (category) {
        fetchCategoryProducts();
      }
    }, [category, categoryState.categoryProducts, fetchProductsForCategory]);

  return (
    <div>
      <div className="title-md text-2xl text-center font-semibold">
        <h3>
          See our{" "}
          <span className="text-capitalize">
          {category.replace("-", " ")}
          </span>
        </h3>
      </div>
      <div className="container flex justify-center mx-auto">
        <div className="cat-products-content">
          {productsStatus === STATUS.LOADING ? (
            <Loader />
          ) : productsStatus === STATUS.SUCCEEDED ? (
            <ProductList products={products} />
          ) : (
            <p>Error fetching products.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
