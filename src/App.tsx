import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleProductPage from "./pages/SingleProductPage";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* single product route */}
          <Route path="/product/:id" element={<SingleProductPage />} />
          {/* category wise product listing route */}
          <Route
            path="/category/:category"
            element={<CategoryProduct category="" />}
          />
          {/* cart */}
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
