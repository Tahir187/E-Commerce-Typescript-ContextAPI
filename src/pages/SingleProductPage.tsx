import { useProduct } from "../context/ProductsProvider";
import { useParams } from "react-router-dom";
import { STATUS } from "../utils/status";
import Loader from "../components/Loader";
import { formatPrice } from "../utils/helper";
import { useCart } from "../context/CartProvider";
import { Link } from "react-router-dom";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";

const SingleProductPage = () => {
  const { id } = useParams();
  const { state: productState, dispatch: productDispatch } = useProduct();
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    productDispatch(fetchSingleProduct(id));

    if (cartState.isCartMessageOn) {
      setTimeout(() => {
        cartDispatch(setCartMessageOff());
      }, 2000);
    }
  }, [cartState.isCartMessageOn]);

  const product = productState.productSingle;
  const productSingleStatus = productState.productSingleStatus;

  let discountedPrice =
    product?.price - product?.price * (product?.discountPercentage / 100);


  if (productSingleStatus === STATUS.LOADING) {
    return <Loader />;
  }

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product?.stock) tempQty = product?.stock;
      return tempQty;
    });
  };

  const decQuantity = () =>{
    setQuantity((prevQty) =>{
        let tempQuantity = prevQty -1; 
        if(tempQuantity < 1) tempQuantity = 1;
        return tempQuantity
    })
  }

  return (
    <>
      <h1>Single Product</h1>
      
    </>
  );
};

export default SingleProductPage;
