import Product from "./Product";

const ProductList = ({ products }) => {
    // console.log(products)
  return (
    <div>
      {products.map((product: any) => {
        let discountedPrice: number =
          product?.price - product?.price * (product?.discountPercentage / 100);

          return(
            <Product
            key={product.id}
            product={{...product, discountedPrice}}
            />
          )
      })}
    </div>
  );
};

export default ProductList;
