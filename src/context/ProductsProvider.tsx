import { ReactElement, createContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/apiURL";

export type ProductType = {
    brand: string;
    category: string;
    discountPercentage: number;
    id: number;
    thumbnail: string;
    title: string;
}

const initialState: ProductType[] = [];


export type UseProductsContextType = {products: ProductType[]};

const initialContextState: UseProductsContextType = {products: []};

const ProductsContext = createContext<UseProductsContextType>(initialContextState);

type ChildrenType = {children?: ReactElement | ReactElement[]};

export const ProductsProvider = ({children}: ChildrenType): ReactElement =>{
    const [products, setProducts] = useState<ProductType[]>(initialState);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`${BASE_URL}products`);
            const data = await res.json();
            console.log(data.products);
            return data.products;
          } catch (error) {
            console.error("Error fetching data:", error);
          }

        };
        fetchData().then(products => setProducts(products));
      }, []);
    
    return(
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}