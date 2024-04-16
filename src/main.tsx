import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ProductProvider } from "./context/ProductsProvider.tsx";
import { CategoryProvider } from "./context/CategoryProvider.tsx";
import { CartProvider } from "./context/CartProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CategoryProvider>
      <ProductProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductProvider>
    </CategoryProvider>
  </React.StrictMode>
);
