import { createContext, useContext, useEffect, useReducer } from "react";
import { BASE_URL } from "../utils/apiURL";

interface ProductType {
  id: number;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  thumbnail: string;
  title: string;
  images: string[];
  price: number
  rating: number;
  stock: number;
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

  const fetchProducts = async (limit: number) => {
    dispatch({ type: "FETCH_PRODUCTS_PENDING", payload: null });

    try {
      const response = await fetch(`${BASE_URL}products?limit=${limit}`);
      const data = await response.json();
      console.log('products', data);

      dispatch({ type: "FETCH_PRODUCTS_FULFILLED", payload: data.products });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: null });
    }
  };

  const fetchSingleProduct = async (id:string) => {
    dispatch({ type: "FETCH_PRODUCT_SINGLE_PENDING", payload: null });

    try {
      const response = await fetch(`${BASE_URL}products/${id}`);
      const data = await response.json();
      dispatch({ type: "FETCH_PRODUCT_SINGLE_FULFILLED", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_PRODUCT_SINGLE_FAILURE", payload: null });
    }
  };

  useEffect(() => {
    fetchProducts(10);
    fetchSingleProduct('id');
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
