// import useProduct from "../hooks/useProduct";
// import useCart from "../hooks/useCart";
import { useEffect } from "react";
import { useProduct } from "../context/ProductsProvider";

const Home = () => {
  // const { products } = useProduct();
  // const { totalPrice } = useCart();
  const { state:{products} } = useProduct();
  // const { products, productsStatus } = state;
  console.log("products", products);

  useEffect(()=>{
    const fetchData = async () =>{
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      console.log("fetch products", data.products);
    }
    fetchData();
  },[])

  return (
    <main className="bg-gradient-to-br from-transparent via-purple-300 to-transparent">
      <h1 className="text-center text-2xl">Products</h1>
    </main>
  );
};

export default Home;
