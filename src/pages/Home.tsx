import { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductsProvider";

const Home = () => {

  const state = useContext(ProductContext)
  console.log("pr conte", state);

  return (
    <main className="bg-gradient-to-br from-transparent via-purple-300 to-transparent">
      <h1 className="text-center text-2xl">Products</h1>
    </main>
  );
};

export default Home;
