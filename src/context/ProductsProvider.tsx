import { createContext, useContext, useEffect, useReducer } from "react";
import { BASE_URL } from "../utils/apiURL";

interface ProductType {
  id: string;
  brand: string;
  category: string;
  discountPercentage: number;
  thumbnail: string[];
  title: string;
}

interface ProductState {
  products: ProductType[];
  productsStatus: string;
  productSingle: ProductType | null;
  productSingleStatus: string;
}

interface ProductAction {
  type: string;
  payload: any;
}

const initialState: ProductState = {
  products: [],
  productsStatus: "IDLE",
  productSingle: null,
  productSingleStatus: "IDLE",
};

export const ProductContext = createContext<{
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const productReducer = (state: ProductState, action: ProductAction) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_PENDING":
      return { ...state, productsStatus: "LOADING" };
    case "FETCH_PRODUCTS_FULFILLED":
      return {
        ...state,
        products: action.payload,
        productsStatus: "SUCCEEDED",
      };
    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, productsStatus: "FAILED" };
    case "FETCH_PRODUCT_SINGLE_PENDING":
      return { ...state, productSingleStatus: "LOADING" };
    case "FETCH_PRODUCT_SINGLE_FULFILLED":
      return {
        ...state,
        productSingle: action.payload,
        productSingleStatus: "SUCCEEDED",
      };
    case "FETCH_PRODUCT_SINGLE_FAILURE":
      return { ...state, productSingleStatus: "FAILED" };
    default:
      return state;
  }
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const fetchProducts = async () => {
    dispatch({ type: "FETCH_PRODUCTS_PENDING", payload: null });

    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      console.log("fetch data products", data.products);
      dispatch({ type: "FETCH_PRODUCTS_FULFILLED", payload: data.products });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: null });
    }
  };

  const fetchSingleProduct = async () => {
    dispatch({ type: "FETCH_PRODUCT_SINGLE_PENDING", payload: null });

    try {
      const response = await fetch(`https://dummyjson.com/products/1`);
      const data = await response.json();
      console.log("data", data);
      dispatch({ type: "FETCH_PRODUCT_SINGLE_FULFILLED", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_PRODUCT_SINGLE_FAILURE", payload: null });
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSingleProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

// export const useProduct = () => useContext(ProductContext);
