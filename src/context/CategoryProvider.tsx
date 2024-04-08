import { createContext, useContext, useEffect, useReducer } from "react";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

interface Category {
  id: string;
  title: string;
}

interface CategoryProduct {
  id: string;
  brand: string;
  category: string;
  discountPercentage: number;
  thumbnail: string;
  title: string;
  images: string[];
}

interface CategoryState {
  categories: Category[];
  categoriesStatus: string;
  categoryProducts: CategoryProduct[];
  categoryProductsStatus: string;
}

type CategoryAction =
  | { type: "FETCH_CATEGORIES_PENDING" }
  | { type: "FETCH_CATEGORIES_FULFILLED"; payload: Category[] }
  | { type: "FETCH_CATEGORIES_FAILURE" }
  | { type: "FETCH_CATEGORY_PRODUCTS_PENDING"; payload: string }
  | { type: "FETCH_CATEGORY_PRODUCTS_FULFILLED"; payload: CategoryProduct[] }
  | { type: "FETCH_CATEGORY_PRODUCTS_FAILURE" };

const initialState: CategoryState = {
  categories: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: [],
  categoryProductsStatus: STATUS.IDLE,
};

const categoryReducer = (state: CategoryState, action: CategoryAction) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_PENDING":
      return { ...state, categoriesStatus: STATUS.LOADING };

    case "FETCH_CATEGORIES_FULFILLED":
      return {
        ...state,
        categories: action.payload,
        categoriesStatus: STATUS.SUCCEEDED,
      };

    case "FETCH_CATEGORIES_FAILURE":
      return { ...state, categoriesStatus: STATUS.FAILED };

    case "FETCH_CATEGORY_PRODUCTS_PENDING":
      return { ...state, categoryProductsStatus: STATUS.LOADING };

    case "FETCH_CATEGORY_PRODUCTS_FULFILLED":
      return {
        ...state,
        categoryProducts: action.payload,
        categoryProductsStatus: STATUS.SUCCEEDED,
      };

    case "FETCH_CATEGORY_PRODUCTS_FAILURE":
      return { ...state, categoryProductsStatus: STATUS.FAILED };

    default:
      return state;
  }
};

const CategoryContext = createContext<{
    state: CategoryState;
    dispatch: React.Dispatch<CategoryAction>;
    fetchProductsForCategory: (categoryId: string) => Promise<void>;
  }>({
    state: initialState,
    dispatch: () => null,
    fetchProductsForCategory: () => Promise.resolve(), 
  });

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const fetchCategories = async (dispatch: React.Dispatch<CategoryAction>) => {
    dispatch({ type: "FETCH_CATEGORIES_PENDING" });
    try {
      const response = await fetch(`${BASE_URL}products/categories`);
      const data = await response.json();
      console.log("category data", data);
      dispatch({ type: "FETCH_CATEGORIES_FULFILLED", payload: data });
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch({ type: "FETCH_CATEGORIES_FAILURE" });
    }
  };

  const fetchCategoryProducts = async (
    dispatch: React.Dispatch<CategoryAction>,
    categoryId: string
  ) => {
    dispatch({ type: "FETCH_CATEGORY_PRODUCTS_PENDING", payload: categoryId });
    try {
      const response = await fetch(`<span class="math-inline">\{BASE\_URL\}products/category/</span>{categoryId}`);
      const data = await response.json();
      dispatch({ type: "FETCH_CATEGORY_PRODUCTS_FULFILLED", payload: data.products });
    } catch (error) {
      console.error("Error fetching category products:", error);
      dispatch({ type: "FETCH_CATEGORY_PRODUCTS_FAILURE" });
    }
  };

  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

  const fetchProductsForCategory = (categoryId: string) =>
  fetchCategoryProducts(dispatch, categoryId);

  return (
<CategoryContext.Provider
      value={{ state, dispatch, fetchProductsForCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
