import { createContext, useContext, useEffect, useReducer } from "react";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

interface SearchState {
  searchProducts: string[];
  searchProductsStatus: typeof STATUS[keyof typeof STATUS];

}

const initialState: SearchState = {
  searchProducts: [],
  searchProductsStatus: STATUS.IDLE,
};

interface SearchAction {
  type:
    | "FETCH_SEARCH_PRODUCTS"
    | "SET_SEARCH_PRODUCTS"
    | "SET_SEARCH_PRODUCTS_STATUS";
  payload?: any;
}

const SearchContext = createContext<{
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const SearchReducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
    case "FETCH_SEARCH_PRODUCTS":
      return { ...state, searchProductsStatus: STATUS.LOADING };

    case "SET_SEARCH_PRODUCTS":
      return {
        ...state,
        searchProducts: action.payload || [],
        searchProductsStatus: STATUS.SUCCEEDED,
      };

    case "SET_SEARCH_PRODUCTS_STATUS":
      return { ...state, searchProductsStatus: action.payload };

    default:
      return state;
  }
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, initialState);

  const fetchSearchProducts = async (searchTerm: string) => {
    dispatch({ type: "FETCH_SEARCH_PRODUCTS" });
    try {
      const response = await fetch(
        `${BASE_URL}products/search?q=${searchTerm}`
      );
      const data = await response.json();
      dispatch({ type: "SET_SEARCH_PRODUCTS", payload: data.products });
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET_SEARCH_PRODUCTS_STATUS", payload: STATUS.FAILED });
    }
  };

  useEffect(()=>{
    fetchSearchProducts('')
  },[dispatch])

  return(
    <SearchContext.Provider value={{state, dispatch}}>
        {children}
    </SearchContext.Provider>
  )

};

export const useSearch = () => useContext(SearchContext);
