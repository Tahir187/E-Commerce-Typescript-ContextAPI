import { createContext, useContext, useEffect, useReducer } from "react";

interface CartItem {
  id: string;
  qunatity: number;
  price: number;
  totalPrice: number;
  stock: number;
}

interface CartState {
  carts: CartItem[];
  itemsCount: number;
  totalAmount: number;
  isCartMessageOn: boolean;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem[] }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "GET_CART_TOTAL" }
  | { type: "TOGGLE_CART_QTY"; payload: { id: string; type: "INC" | "DEC" } }
  | { type: "SET_CART_MESSAGE_ON" }
  | { type: "SET_CART_MESSAGE_OFF" };

const fetchFromLocalStorage = (): CartItem[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const storeInLocalStorage = (data: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialCartState: CartState = {
  carts: fetchFromLocalStorage(),
  itemsCount: 0,
  totalAmount: 0,
  isCartMessageOn: false,
};

const CartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const isItemInCart = state.carts.find(
        (item) => item.id === action.payload.id
      );

      if (isItemInCart) {
        const tempCart = state.carts.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.qunatity + action.payload.quantity,
                totalPrice:
                  (item.qunatity + action.payload.quantity) * item.price,
              }
            : item
        );
        storeInLocalStorage(tempCart);
        return { ...state, tempCart };
      } else {
        const updatedCart = [...state.carts, action.payload];
        storeInLocalStorage(updatedCart);
        return { ...state, carts: updatedCart };
      }
    }
    case "REMOVE_FROM_CART": {
      const tempCart = state.carts.filter((item) => item.id !== action.payload);
      storeInLocalStorage(tempCart);
      return { ...state, carts: tempCart };
    }
    case "CLEAR_CART": {
      storeInLocalStorage([]);
      return { ...state, carts: [] };
    }
    case "GET_CART_TOTAL": {
      const totalAmount = state.carts.reduce(
        (total, item) => total + item.price,
        0
      );
      return { ...state, totalAmount, itemsCount: state.carts.length };
    }
    case "TOGGLE_CART_QTY": {
      const tempCart = state.carts.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity:
                action.payload.type === "INC"
                  ? Math.min(item.qunatity + 1, item.stock)
                  : Math.max(item.qunatity - 1, 1),
              totalPrice:
                action.payload.type === "INC"
                  ? Math.min(item.qunatity + 1, item.stock) * item.price
                  : Math.max(item.qunatity - 1, 1) * item.price,
            }
          : item
      );
      storeInLocalStorage(tempCart);
      return { ...state, carts: tempCart };
    }
    case "SET_CART_MESSAGE_ON": {
      return { ...state, isCartMessageOn: true };
    }
    case "SET_CART_MESSAGE_OFF": {
      return { ...state, isCartMessageOn: false };
    }
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialCartState,
  dispatch: () => null,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    dispatch({ type: "GET_CART_TOTAL" });
  }, [state.carts]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
