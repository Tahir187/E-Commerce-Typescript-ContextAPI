import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ProductProvider } from "./context/ProductsProvider.tsx";
import { CategoryProvider } from "./context/CategoryProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CategoryProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CategoryProvider>
  </React.StrictMode>
);
