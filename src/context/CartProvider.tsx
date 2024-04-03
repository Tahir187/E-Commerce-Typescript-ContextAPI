import { ReactElement, createContext, useMemo, useReducer } from "react";

export type CartItemType = {
  id: string;
  title: string;
  discountPercentage: number;
  qty: number;
  brand?: string;
  category?: string;
  description?: string;
  rating?: number;
  stock?: number;
  thumbnail?: string;
};

type CartStateType = { cart: CartItemType[] };

const initialCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload is missing in Add action");
      }

      const { id, title, discountPercentage } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );

      const qty: number = itemExists ? itemExists.qty + 1 : 1;
      return {
        ...state,
        cart: [...filteredCart, { id, title, discountPercentage, qty }],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload is missing in Remove action");
      }
      const { id } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload is missing in Quantity action");
      }

      const { id, qty } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );

      if (!itemExists) {
        throw new Error("Item mmust exist in order to update quantity");
      }

      const updatedItem: CartItemType = { ...itemExists, qty };

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Undefined reducered occured");
  }
};

const useCartContext = (initialCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initialCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems: number = state.cart.reduce(
    (previousValue: any, cartItem: any) => {
      return previousValue + cartItem.qty;
    },
    0
  );

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue: any, cartItem: any) => {
      return previousValue + cartItem.qty * cartItem.discountPercentage;
    }, 0)
  )


  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.id.slice(-4))
    const itemB = Number(b.id.slice(-4))
    return itemA - itemB
})

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initialCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext = createContext<UseCartContextType>(
  initialCartContextState
);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initialCartState)}>
      {children}
    </CartContext.Provider>
  );
};
