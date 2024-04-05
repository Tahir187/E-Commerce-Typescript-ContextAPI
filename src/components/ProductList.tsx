import Product from "./Product";

const ProductList = ({ products }) => {
    // console.log(products)
  return (
    <div className="product-lists flex flex-col px-2 md:px-0  my-3 gap-y-6"> 
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
